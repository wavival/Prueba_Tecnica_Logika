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
  const color = isError ? '#ef4444' : '#10b981'; // rojo / verde

  return createPortal(
    <div style={styles.backdrop} onClick={onClose}>
      <div
        style={{ ...styles.card, borderColor: color }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ ...styles.header, color }}>
          <div style={{ ...styles.dot, background: color }} />
          <strong>{title ?? (isError ? 'Error' : 'Éxito')}</strong>
        </div>
        {message && <div style={styles.body}>{message}</div>}
        <div style={styles.actions}></div>
      </div>
    </div>,
    document.body,
  );
}

const styles = {
  backdrop: {
    position: 'fixed',
    inset: 0,
    display: 'grid',
    placeItems: 'center',
    background: 'rgba(0,0,0,0.25)',
    zIndex: 1000,
  },
  card: {
    width: 'min(92vw, 360px)',
    background: '#fff',
    border: '1px solid',
    borderRadius: 10,
    boxShadow: '0 20px 60px rgba(0,0,0,0.16)',
    overflow: 'hidden',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '12px 14px',
  },
  dot: { width: 10, height: 10, borderRadius: '50%' },
  body: {
    padding: '0 14px 12px 14px',
    color: '#111827',
    fontSize: 14,
    whiteSpace: 'pre-wrap',
  },
  actions: {
    padding: '10px 14px',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  btn: {
    background: 'transparent',
    border: '1px solid',
    padding: '6px 10px',
    borderRadius: 6,
    cursor: 'pointer',
    fontSize: 14,
  },
};
