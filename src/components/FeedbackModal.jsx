import { useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function FeedbackModal({
  open,
  type = 'success', // 'success' | 'error'
  title,
  message,
  onClose,
  autoClose = true,
  duration = 1600,
}) {
  useEffect(() => {
    if (!open || !autoClose) return;
    const id = setTimeout(() => onClose?.(), duration);
    return () => clearTimeout(id);
  }, [open, autoClose, duration, onClose]);

  if (!open) return null;

  const isError = type === 'error';
  const colorClass = isError
    ? 'text-red-500 border-red-400'
    : 'text-green-600 border-green-400';
  const dotClass = isError ? 'bg-red-500' : 'bg-green-500';
  const bgClass = isError ? 'bg-red-50' : 'bg-green-50';

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className={`w-[90%] max-w-sm rounded-lg border bg-white shadow-lg transition-all duration-200 ${colorClass}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className={`flex items-center gap-2 border-b px-4 py-3 ${bgClass}`}
        >
          <div className={`h-2.5 w-2.5 rounded-full ${dotClass}`}></div>
          <strong className="text-base font-medium">
            {title ?? (isError ? 'Error' : 'Éxito')}
          </strong>
        </div>

        {/* Body */}
        {message && (
          <div className="px-5 py-4 text-sm text-gray-700 whitespace-pre-line">
            {message}
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}
