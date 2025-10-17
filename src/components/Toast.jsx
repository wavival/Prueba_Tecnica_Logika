import { useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function Toast({
  open,
  message,
  onClose,
  duration = 3000,
  type = 'success',
}) {
  useEffect(() => {
    if (!open) return;
    const id = setTimeout(() => onClose?.(), duration);
    return () => clearTimeout(id);
  }, [open, duration, onClose]);

  if (!open) return null;

  const isError = type === 'error';

  return createPortal(
    <div
      className="fixed inset-0 grid place-items-center bg-black/15 z-[1000]"
      onClick={onClose}
      aria-live="polite"
      role="status"
    >
      <div
        className={[
          'flex items-center gap-2 px-3.5 py-2.5 bg-white',
          'border rounded-lg shadow-xl text-sm max-w-xs',
          isError ? 'border-rose-600' : 'border-emerald-500',
        ].join(' ')}
        onClick={(e) => e.stopPropagation()}
      >
        <span
          className={[
            'w-2.5 h-2.5 rounded-full shrink-0',
            isError ? 'bg-rose-600' : 'bg-emerald-500',
          ].join(' ')}
        />
        <span>{message}</span>
      </div>
    </div>,
    document.body,
  );
}
