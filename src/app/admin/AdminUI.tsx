"use client";

import { useState, useCallback, useMemo, useEffect } from "react";

// ─── Toast ────────────────────────────────────────────────────────────────────

interface ToastItem {
  id: number;
  type: "success" | "error";
  message: string;
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback((type: ToastItem["type"], message: string) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 4000);
  }, []);

  const toast = useMemo(
    () => ({
      success: (message: string) => addToast("success", message),
      error: (message: string) => addToast("error", message),
    }),
    [addToast]
  );

  return { toasts, toast, dismiss };
}

function ToastItem({ item, onDismiss }: { item: ToastItem; onDismiss: () => void }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(t);
  }, []);

  const isSuccess = item.type === "success";

  return (
    <div
      className={`flex items-start gap-3 px-4 py-3 rounded-xl shadow-lg border text-sm font-medium transition-all duration-200 ${
        visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6"
      } ${isSuccess ? "bg-white border-green-200 text-green-800" : "bg-white border-red-200 text-red-800"}`}
    >
      {isSuccess ? (
        <svg className="w-4 h-4 mt-0.5 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        <svg className="w-4 h-4 mt-0.5 text-red-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      )}
      <span className="max-w-xs leading-snug">{item.message}</span>
      <button
        onClick={onDismiss}
        className="ml-2 shrink-0 text-gray-300 hover:text-gray-500 transition-colors"
        aria-label="Dismiss"
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

export function ToastContainer({
  toasts,
  onDismiss,
}: {
  toasts: ToastItem[];
  onDismiss: (id: number) => void;
}) {
  if (toasts.length === 0) return null;
  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-2 pointer-events-none">
      {toasts.map((t) => (
        <div key={t.id} className="pointer-events-auto">
          <ToastItem item={t} onDismiss={() => onDismiss(t.id)} />
        </div>
      ))}
    </div>
  );
}

// ─── Confirm Dialog ───────────────────────────────────────────────────────────

interface ConfirmState {
  message: string;
  detail?: string;
  confirmLabel: string;
  resolve: (value: boolean) => void;
}

export function useConfirm() {
  const [state, setState] = useState<ConfirmState | null>(null);

  const confirm = useCallback(
    (message: string, opts?: { detail?: string; confirmLabel?: string }): Promise<boolean> =>
      new Promise((resolve) =>
        setState({ message, detail: opts?.detail, confirmLabel: opts?.confirmLabel ?? "Confirm", resolve })
      ),
    []
  );

  const close = useCallback((value: boolean) => {
    setState((s) => {
      s?.resolve(value);
      return null;
    });
  }, []);

  return { confirm, confirmState: state, closeConfirm: close };
}

export function ConfirmDialog({
  state,
  onClose,
}: {
  state: ConfirmState | null;
  onClose: (value: boolean) => void;
}) {
  useEffect(() => {
    if (!state) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [state, onClose]);

  if (!state) return null;

  return (
    <div
      className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={() => onClose(false)}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-gray-900 font-semibold text-base leading-snug">{state.message}</p>
        {state.detail && (
          <p className="text-gray-500 text-sm mt-2 leading-snug">{state.detail}</p>
        )}
        <div className="flex gap-3 mt-6 justify-end">
          <button
            onClick={() => onClose(false)}
            className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            autoFocus
            onClick={() => onClose(true)}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            {state.confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
