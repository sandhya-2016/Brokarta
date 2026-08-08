"use client";

import { useEffect } from "react";
import { AlertTriangle, CheckCircle2, Info, X, Trash2, HelpCircle } from "lucide-react";

/**
 * Custom Admin Popup Modal replacing browser native alert() and confirm() dialogs.
 */
export default function AdminPopupModal({
  isOpen,
  type = "alert", // "alert", "confirm", "success", "error", "delete"
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onClose,
  loading = false,
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen && !loading) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, loading, onClose]);

  if (!isOpen) return null;

  const isConfirm = type === "confirm" || type === "delete";
  const isDelete = type === "delete";
  const isSuccess = type === "success";
  const isError = type === "error" || type === "alert";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm transition-opacity duration-200 animate-fadeIn">
      {/* Backdrop Click */}
      <div
        className="absolute inset-0"
        onClick={() => !loading && onClose()}
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden z-10 animate-scaleUp">

        <button
          onClick={() => !loading && onClose()}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-6 text-center space-y-4">
          {/* Icon Badge */}
          <div className="flex justify-center">
            <div
              className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-inner ${
                isDelete
                  ? "bg-red-50 text-red-500 border border-red-100"
                  : isSuccess
                  ? "bg-emerald-50 text-emerald-500 border border-emerald-100"
                  : isError
                  ? "bg-amber-50 text-amber-600 border border-amber-100"
                  : "bg-blue-50 text-[#013144] border border-blue-100"
              }`}
            >
              {isDelete ? (
                <Trash2 className="w-8 h-8" />
              ) : isSuccess ? (
                <CheckCircle2 className="w-8 h-8" />
              ) : isError ? (
                <AlertTriangle className="w-8 h-8" />
              ) : (
                <HelpCircle className="w-8 h-8" />
              )}
            </div>
          </div>

          {/* Title & Message */}
          <div className="space-y-1.5">
            <h3 className="text-lg font-black text-slate-900 tracking-tight font-oswald uppercase">
              {title || (isDelete ? "Confirm Deletion" : isConfirm ? "Confirmation Required" : isSuccess ? "Success" : "Notice")}
            </h3>
            <p className="text-xs text-slate-600 font-medium leading-relaxed max-w-sm mx-auto">
              {message}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex items-center justify-center gap-3">
            {isConfirm && (
              <button
                type="button"
                disabled={loading}
                onClick={onClose}
                className="flex-1 py-3 px-4 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs transition-colors cursor-pointer disabled:opacity-50"
              >
                {cancelText}
              </button>
            )}

            <button
              type="button"
              disabled={loading}
              onClick={() => {
                if (isConfirm && onConfirm) {
                  onConfirm();
                } else {
                  onClose();
                }
              }}
              className={`py-3 px-6 rounded-xl text-white font-bold text-xs transition-all shadow-md cursor-pointer disabled:opacity-50 ${
                isConfirm ? "flex-1" : "w-full max-w-[160px]"
              } ${
                isDelete
                  ? "bg-red-600 hover:bg-red-700 shadow-red-500/20"
                  : isSuccess
                  ? "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/20"
                  : "bg-[#013144] hover:bg-[#012230] shadow-slate-900/20"
              }`}
            >
              {loading ? "Processing..." : isConfirm ? confirmText : "OK, Got It"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
