import { useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function Toast({
  open,
  message,
  onClose,
  duration = 1800,
  type = 'success',
}) {
  useEffect(() => {
    if (!open) return;
    const id = setTimeout(() => onClose?.(), duration);
    return () => clearTimeout(id);
  }, [open, duration, onClose]);

  if (!open) return null;

  return createPortal(
    <div style={styles.backdrop} onClick={onClose}>
      <div
        style={{
          ...styles.box,
          borderColor: type === 'error' ? '#e11d48' : '#10b981',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            ...styles.dot,
            background: type === 'error' ? '#e11d48' : '#10b981',
          }}
        />
        <span>{message}</span>
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
    background: 'rgba(0,0,0,0.15)',
    zIndex: 1000,
  },
  box: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '10px 14px',
    background: '#fff',
    border: '1px solid',
    borderRadius: 8,
    boxShadow: '0 10px 30px rgba(0,0,0,0.12)',
    fontSize: 14,
    maxWidth: 320,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: '50%',
    flex: '0 0 10px',
  },
};
