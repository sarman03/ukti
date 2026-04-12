"use client";

import { useState, useCallback } from "react";
import Cropper, { type Area } from "react-easy-crop";

interface ImageCropModalProps {
  imageSrc: string;
  aspect: number;
  aspectLabel?: string;
  onConfirm: (blob: Blob) => void;
  onCancel: () => void;
}

function getCroppedBlob(imageSrc: string, crop: Area): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = crop.width;
      canvas.height = crop.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return reject(new Error("No canvas context"));

      ctx.drawImage(
        img,
        crop.x,
        crop.y,
        crop.width,
        crop.height,
        0,
        0,
        crop.width,
        crop.height
      );

      canvas.toBlob(
        (blob) => {
          if (blob) resolve(blob);
          else reject(new Error("Failed to create blob"));
        },
        "image/webp",
        0.9
      );
    };
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = imageSrc;
  });
}

export default function ImageCropModal({
  imageSrc,
  aspect,
  aspectLabel,
  onConfirm,
  onCancel,
}: ImageCropModalProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState<Area | null>(null);
  const [processing, setProcessing] = useState(false);

  const onCropComplete = useCallback(
    (_: Area, croppedAreaPixels: Area) => {
      setCroppedArea(croppedAreaPixels);
    },
    []
  );

  async function handleConfirm() {
    if (!croppedArea) return;
    setProcessing(true);
    try {
      const blob = await getCroppedBlob(imageSrc, croppedArea);
      onConfirm(blob);
    } catch (err) {
      alert("Crop failed: " + (err as Error).message);
      setProcessing(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex flex-col">
      <div className="flex items-center justify-between px-6 py-4 bg-gray-900">
        <h3 className="text-white font-semibold text-lg">
          Crop Image
          {aspectLabel && (
            <span className="text-gray-400 font-normal text-sm ml-2">
              ({aspectLabel})
            </span>
          )}
        </h3>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            disabled={processing}
            className="px-4 py-2 bg-gray-700 text-white rounded-lg text-sm font-medium hover:bg-gray-600 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={processing}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {processing ? "Processing..." : "Crop & Upload"}
          </button>
        </div>
      </div>

      <div className="relative flex-1">
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          aspect={aspect}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
        />
      </div>

      <div className="px-6 py-4 bg-gray-900 flex items-center gap-4">
        <span className="text-white text-sm">Zoom</span>
        <input
          type="range"
          min={1}
          max={3}
          step={0.05}
          value={zoom}
          onChange={(e) => setZoom(Number(e.target.value))}
          className="flex-1 accent-blue-500"
        />
      </div>
    </div>
  );
}
