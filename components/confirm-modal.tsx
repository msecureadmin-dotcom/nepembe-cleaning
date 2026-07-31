"use client";

import { useEffect } from "react";

interface ConfirmModalProps {
  open: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({ open, title, message, onConfirm, onCancel }: ConfirmModalProps) {
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
      else if (e.key === "Enter") onConfirm();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onConfirm, onCancel]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-6" onClick={onCancel}>
      <div className="bg-white rounded-2xl border border-[#eadbc2] shadow-2xl max-w-md w-full p-6 text-center space-y-4" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-xl font-black text-[#2f261c]">{title}</h3>
        <p className="text-[#766653]">{message}</p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={onCancel}
            className="px-6 py-2 rounded-full font-bold border border-[#eadbc2] text-[#2f261c] bg-[#fff9ef] hover:bg-[#f4e4c8] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2 rounded-full font-bold text-white bg-gradient-to-r from-[#d6a85f] to-[#0f766e] hover:opacity-90 transition-opacity"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
