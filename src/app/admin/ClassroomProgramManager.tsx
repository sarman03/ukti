"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  CLASSROOM_HOME_CONFIG_PATH,
  CLASSROOM_HOME_IMAGE_FOLDER,
  CLASSROOM_PAGE_CONFIG_PATH,
  CLASSROOM_PAGE_IMAGE_FOLDER,
  DEFAULT_CLASSROOM_PAGE_CARDS,
  DEFAULT_HOME_CLASSROOM_CARDS,
  createProgramId,
  getStoragePublicUrl,
  readProgramConfig,
  type ClassroomPageCard,
  type HomeClassroomCard,
  type ProgramSectionGroup,
  type ProgramTab,
  writeProgramConfig,
} from "@/lib/classroomPrograms";
import { CLASSROOM_CARD_FALLBACK_IMAGES } from "@/lib/imageDefaults";
import { supabase } from "@/lib/supabase";
import { useSupabaseSlotImages } from "@/lib/useSupabaseImages";
import { ConfirmDialog, ToastContainer, useConfirm, useToast } from "./AdminUI";

type ManagerMode = "home" | "page";
type Card = HomeClassroomCard | ClassroomPageCard;

async function normalizeFile(file: File): Promise<File> {
  const isHeic =
    file.type === "image/heic" ||
    file.type === "image/heif" ||
    /\.heic$/i.test(file.name) ||
    /\.heif$/i.test(file.name);
  if (!isHeic) return file;
  const heic2any = (await import("heic2any")).default;
  const blob = (await heic2any({
    blob: file,
    toType: "image/jpeg",
    quality: 0.92,
  })) as Blob;
  return new File([blob], file.name.replace(/\.[^.]+$/, ".jpg"), {
    type: "image/jpeg",
  });
}

function pointsToText(points?: string[]) {
  return (points ?? []).join("\n");
}

function textToPoints(value: string) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export default function ClassroomProgramManager({ mode }: { mode: ManagerMode }) {
  const isHome = mode === "home";
  const title = isHome ? "Classroom Cards Content" : "Program Details Content";
  const configPath = isHome ? CLASSROOM_HOME_CONFIG_PATH : CLASSROOM_PAGE_CONFIG_PATH;
  const imageFolder = isHome
    ? CLASSROOM_HOME_IMAGE_FOLDER
    : CLASSROOM_PAGE_IMAGE_FOLDER;
  const defaults = useMemo<Card[]>(
    () => (isHome ? DEFAULT_HOME_CLASSROOM_CARDS : DEFAULT_CLASSROOM_PAGE_CARDS),
    [isHome]
  );
  const legacyFolder = isHome ? "classroom" : "classroom-cards";

  const [cards, setCards] = useState<Card[]>(defaults);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const [collapsed, setCollapsed] = useState(true);
  const [activeTab, setActiveTab] = useState<ProgramTab>("preschool");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [dirty, setDirty] = useState(false);

  const { toasts, toast, dismiss } = useToast();
  const { confirm, confirmState, closeConfirm } = useConfirm();
  const { images: legacyImages, removed: removedLegacyImages } = useSupabaseSlotImages(
    legacyFolder,
    5
  );

  const loadCards = useCallback(async () => {
    const next = await readProgramConfig<Card[]>(configPath, defaults);
    setCards(Array.isArray(next) ? next : defaults);
    setLoading(false);
    setDirty(false);
  }, [configPath, defaults]);

  useEffect(() => {
    loadCards();
  }, [loadCards]);

  const visibleCards = cards.filter((card) => card.tab === activeTab);
  const editingCard = cards.find((card) => card.id === editingId) ?? null;

  function updateCard(cardId: string, updater: (card: Card) => Card) {
    setCards((prev) => prev.map((card) => (card.id === cardId ? updater(card) : card)));
    setDirty(true);
  }

  function addCard(tab: ProgramTab) {
    const baseCard: Card = isHome
      ? {
          id: createProgramId("home-card"),
          tab,
          title: "",
          age: "",
          description: "",
          imagePath: "",
        }
      : {
          id: createProgramId("page-card"),
          tab,
          title: "",
          subtitle: "",
          description: "",
          points: [],
          sections: [],
          imagePath: "",
          imageHeight: "normal",
        };
    setCards((prev) => [...prev, baseCard]);
    setEditingId(baseCard.id);
    setDirty(true);
  }

  async function saveCards() {
    setSaving(true);
    try {
      await writeProgramConfig(configPath, cards);
      toast.success("Cards saved successfully.");
      setDirty(false);
    } catch (error) {
      toast.error("Save failed: " + (error as Error).message);
    }
    setSaving(false);
  }

  async function handleImageUpload(cardId: string, file: File) {
    setUploadingId(cardId);
    try {
      const normalized = await normalizeFile(file).catch(() => file);
      const current = cards.find((card) => card.id === cardId);
      const ext =
        normalized.name.split(".").pop()?.toLowerCase() ||
        normalized.type.split("/").pop() ||
        "jpg";
      const path = `${imageFolder}/${cardId}-${Date.now()}.${ext}`;

      if (current?.imagePath) {
        await supabase.storage.from("images").remove([current.imagePath]);
      }

      const { error } = await supabase.storage.from("images").upload(path, normalized, {
        contentType: normalized.type || "image/jpeg",
        upsert: true,
      });
      if (error) throw new Error(error.message);

      updateCard(cardId, (card) => ({ ...card, imagePath: path, imageRemoved: false }));
      toast.success("Image uploaded.");
    } catch (error) {
      toast.error("Image upload failed: " + (error as Error).message);
    }
    setUploadingId(null);
  }

  async function handleDelete(card: Card) {
    const ok = await confirm("Delete this card?", {
      detail: "This removes the card from admin-managed content.",
      confirmLabel: "Delete",
    });
    if (!ok) return;

    try {
      if (card.imagePath) {
        await supabase.storage.from("images").remove([card.imagePath]);
      }
      setCards((prev) => prev.filter((item) => item.id !== card.id));
      if (editingId === card.id) setEditingId(null);
      setDirty(true);
      toast.success("Card deleted.");
    } catch (error) {
      toast.error("Delete failed: " + (error as Error).message);
    }
  }

  async function handleDeleteImage(card: Card) {
    const ok = await confirm("Delete this image?", {
      detail: "The card will show no image until you upload a new one.",
      confirmLabel: "Delete image",
    });
    if (!ok) return;

    try {
      if (card.imagePath) {
        await supabase.storage.from("images").remove([card.imagePath]);
      }
      updateCard(card.id, (item) => ({
        ...item,
        imagePath: "",
        imageRemoved: true,
      }));
      toast.success("Image deleted.");
    } catch (error) {
      toast.error("Delete image failed: " + (error as Error).message);
    }
  }

  function updateSections(
    cardId: string,
    updater: (sections: ProgramSectionGroup[]) => ProgramSectionGroup[]
  ) {
    updateCard(cardId, (card) => {
      if (isHome) return card;
      return {
        ...card,
        sections: updater((card as ClassroomPageCard).sections ?? []),
      };
    });
  }

  function resolveCardImage(card: Card) {
    if (card.imageRemoved) return "";
    const uploaded = getStoragePublicUrl(card.imagePath);
    if (uploaded) return uploaded;
    const index = cards.findIndex((item) => item.id === card.id);
    if (index === -1 || index >= CLASSROOM_CARD_FALLBACK_IMAGES.length) return "";
    return removedLegacyImages[index]
      ? legacyImages[index]
      : legacyImages[index] || CLASSROOM_CARD_FALLBACK_IMAGES[index];
  }

  function renderEditorFields(card: Card) {
    const pageCard = card as ClassroomPageCard;
    const imageUrl = resolveCardImage(card);

    return (
      <div className="grid gap-5 lg:grid-cols-[180px,1fr]">
        <div>
          <div className="relative w-full max-w-[180px] aspect-square rounded-xl bg-gray-100 overflow-hidden border border-gray-200">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={card.title || "Card image"}
                fill
                className="object-cover"
                sizes="180px"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-400">
                No image
              </div>
            )}
          </div>

          <label className="mt-3 block text-center px-3 py-2 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors cursor-pointer">
            {uploadingId === card.id ? "Uploading..." : imageUrl ? "Replace Image" : "Upload Image"}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              disabled={uploadingId === card.id}
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) void handleImageUpload(card.id, file);
                event.target.value = "";
              }}
            />
          </label>

          {imageUrl && (
            <button
              onClick={() => void handleDeleteImage(card)}
              className="mt-2 block w-full text-center px-3 py-2 rounded-lg text-sm font-medium bg-red-100 text-red-700 hover:bg-red-200 transition-colors"
            >
              Delete Image
            </button>
          )}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="block">
            <span className="block text-xs font-semibold text-gray-600 mb-1">Tab</span>
            <select
              value={card.tab}
              onChange={(event) =>
                updateCard(card.id, (item) => ({
                  ...item,
                  tab: event.target.value as ProgramTab,
                }))
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
            >
              <option value="preschool">Pre School</option>
              <option value="afterschool">After School</option>
            </select>
          </label>

          <label className="block">
            <span className="block text-xs font-semibold text-gray-600 mb-1">Title</span>
            <input
              value={card.title}
              onChange={(event) =>
                updateCard(card.id, (item) => ({
                  ...item,
                  title: event.target.value,
                }))
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
            />
          </label>

          {isHome ? (
            <label className="block">
              <span className="block text-xs font-semibold text-gray-600 mb-1">Age label</span>
              <input
                value={(card as HomeClassroomCard).age ?? ""}
                onChange={(event) =>
                  updateCard(card.id, (item) => ({
                    ...item,
                    age: event.target.value,
                  }))
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
              />
            </label>
          ) : (
            <>
              <label className="block">
                <span className="block text-xs font-semibold text-gray-600 mb-1">Subtitle</span>
                <input
                  value={pageCard.subtitle}
                  onChange={(event) =>
                    updateCard(card.id, (item) => ({
                      ...(item as ClassroomPageCard),
                      subtitle: event.target.value,
                    }))
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                />
              </label>

              <label className="block">
                <span className="block text-xs font-semibold text-gray-600 mb-1">Image height</span>
                <select
                  value={pageCard.imageHeight ?? "normal"}
                  onChange={(event) =>
                    updateCard(card.id, (item) => ({
                      ...(item as ClassroomPageCard),
                      imageHeight: event.target.value as "normal" | "tall",
                    }))
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                >
                  <option value="normal">Normal</option>
                  <option value="tall">Tall</option>
                </select>
              </label>
            </>
          )}

          <label className="block md:col-span-2">
            <span className="block text-xs font-semibold text-gray-600 mb-1">Description</span>
            <textarea
              value={card.description}
              onChange={(event) =>
                updateCard(card.id, (item) => ({
                  ...item,
                  description: event.target.value,
                }))
              }
              rows={4}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
            />
          </label>

          {!isHome && (
            <>
              <label className="block md:col-span-2">
                <span className="block text-xs font-semibold text-gray-600 mb-1">Bullet points</span>
                <textarea
                  value={pointsToText(pageCard.points)}
                  onChange={(event) =>
                    updateCard(card.id, (item) => ({
                      ...(item as ClassroomPageCard),
                      points: textToPoints(event.target.value),
                    }))
                  }
                  rows={5}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  placeholder="One point per line"
                />
              </label>

              <div className="md:col-span-2 border border-gray-200 rounded-lg p-3">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-semibold text-gray-800">Grouped sections</p>
                  <button
                    onClick={() =>
                      updateSections(card.id, (sections) => [
                        ...sections,
                        {
                          id: createProgramId("section"),
                          heading: "",
                          points: [],
                        },
                      ])
                    }
                    className="px-3 py-1.5 rounded text-xs font-medium bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition-colors"
                  >
                    Add Section
                  </button>
                </div>

                <div className="space-y-3">
                  {(pageCard.sections ?? []).map((section) => (
                    <div key={section.id} className="border border-gray-200 rounded-lg p-3">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <input
                          value={section.heading}
                          onChange={(event) =>
                            updateSections(card.id, (sections) =>
                              sections.map((item) =>
                                item.id === section.id
                                  ? { ...item, heading: event.target.value }
                                  : item
                              )
                            )
                          }
                          placeholder="Section heading"
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                        />
                        <button
                          onClick={() =>
                            updateSections(card.id, (sections) =>
                              sections.filter((item) => item.id !== section.id)
                            )
                          }
                          className="px-3 py-2 rounded text-xs font-medium bg-red-100 text-red-700 hover:bg-red-200 transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                      <textarea
                        value={pointsToText(section.points)}
                        onChange={(event) =>
                          updateSections(card.id, (sections) =>
                            sections.map((item) =>
                              item.id === section.id
                                ? { ...item, points: textToPoints(event.target.value) }
                                : item
                            )
                          )
                        }
                        rows={4}
                        placeholder="One point per line"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  const badgeLabel = loading ? "..." : `${cards.length} cards${dirty ? " • unsaved" : ""}`;

  return (
    <div className="border border-gray-200 rounded-xl bg-white overflow-hidden">
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <h2 className="text-base font-bold text-gray-800">{title}</h2>
          <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
            {badgeLabel}
          </span>
        </div>
        <svg
          className={`w-5 h-5 text-gray-400 transition-transform ${collapsed ? "" : "rotate-180"}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {!collapsed && (
        <div className="px-6 pb-6 border-t border-gray-100 pt-4">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
            <div className="flex gap-2">
              {(["preschool", "afterschool"] as ProgramTab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    activeTab === tab
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {tab === "preschool" ? "Pre School" : "After School"}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => addCard(activeTab)}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
              >
                Add Card
              </button>
              <button
                onClick={saveCards}
                disabled={saving || loading}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>

          {loading ? (
            <p className="text-sm text-gray-400">Loading...</p>
          ) : visibleCards.length === 0 ? (
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
              <p className="text-sm text-gray-500 mb-3">No cards in this tab yet.</p>
              <button
                onClick={() => addCard(activeTab)}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
              >
                Add First Card
              </button>
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {visibleCards.map((card) => {
                const imageUrl = resolveCardImage(card);
                const subtitle = isHome
                  ? (card as HomeClassroomCard).age
                  : (card as ClassroomPageCard).subtitle;
                const detailCount = !isHome
                  ? ((card as ClassroomPageCard).points?.length ?? 0) +
                    ((card as ClassroomPageCard).sections?.length ?? 0)
                  : 0;

                return (
                  <div key={card.id} className="border border-gray-200 rounded-xl p-3">
                    <div className="flex items-start gap-3">
                      <div className="relative w-20 h-20 rounded-lg bg-gray-100 overflow-hidden border border-gray-200 shrink-0">
                        {imageUrl ? (
                          <Image
                            src={imageUrl}
                            alt={card.title || "Card image"}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center text-[10px] text-gray-400">
                            No image
                          </div>
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-gray-900 truncate">
                          {card.title || "Untitled card"}
                        </p>
                        <p className="text-xs text-gray-500 truncate mt-0.5">
                          {subtitle || card.id}
                        </p>
                        <p className="text-xs text-gray-600 mt-2 line-clamp-3">
                          {card.description || "No description yet."}
                        </p>
                        {!isHome && (
                          <p className="text-[11px] text-gray-400 mt-2">
                            {detailCount} detail item{detailCount === 1 ? "" : "s"}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-3">
                      <button
                        onClick={() => setEditingId(card.id)}
                        className="px-3 py-1.5 rounded text-xs font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                      >
                        Edit
                      </button>

                      <div className="ml-auto flex flex-wrap gap-2">
                        <button
                          onClick={() => handleDelete(card)}
                          className="px-3 py-1.5 rounded text-xs font-medium bg-red-100 text-red-700 hover:bg-red-200 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {editingCard && (
            <div
              className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
              onClick={() => setEditingId(null)}
            >
              <div
                className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Edit Card</h3>
                    <p className="text-sm text-gray-500 mt-0.5">
                      Image and content live together in this editor.
                    </p>
                  </div>
                  <button
                    onClick={() => setEditingId(null)}
                    className="px-3 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                  >
                    Close
                  </button>
                </div>

                <div className="px-6 py-5 overflow-y-auto max-h-[calc(90vh-140px)]">
                  {renderEditorFields(editingCard)}
                </div>

                <div className="flex items-center justify-between gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50">
                  <p className="text-xs text-gray-500">
                    Changes stay local until you click Save Changes.
                  </p>
                  <button
                    onClick={() => setEditingId(null)}
                    className="px-4 py-2 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <ToastContainer toasts={toasts} onDismiss={dismiss} />
      <ConfirmDialog state={confirmState} onClose={closeConfirm} />
    </div>
  );
}
