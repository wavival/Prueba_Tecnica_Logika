import { useState } from 'react';
import { actionsService } from '@/api/actionsService';
import { useNavigate } from 'react-router-dom';
import FeedbackModal from '@/components/FeedbackModal';
import { mapApiError } from '@/utils/errorMapper';

const STATUS_OPTIONS = [
  { label: 'ACTIVE', value: 1 },
  { label: 'INACTIVE', value: 0 },
];

export default function Create() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('#2f80ed');
  const [status, setStatus] = useState(1);
  const [iconFile, setIconFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState('success');
  const [modalMsg, setModalMsg] = useState('');

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await actionsService.createAction({
        name,
        description,
        color,
        status,
        iconFile,
      });
      setModalType('success');
      setModalMsg('Acción creada con éxito');
      setModalOpen(true);
    } catch (err) {
      setModalType('error');
      setModalMsg(mapApiError(err, 'CREATE_ACTION'));
      setModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    if (modalType === 'success') {
      navigate('/dashboard', { state: { refresh: Date.now() } });
    }
  };

  return (
    <form onSubmit={onSubmit} style={{ padding: 24 }}>
      <h1>Crear Acción</h1>

      {/* 🔹 Nuevo botón para volver */}
      <button
        type="button"
        onClick={() => navigate('/dashboard')}
        style={{
          marginBottom: 16,
          padding: '6px 12px',
          background: '#f3f4f6',
          border: '1px solid #ccc',
          borderRadius: 6,
          cursor: 'pointer',
        }}
      >
        ← Volver al Dashboard
      </button>

      <div>
        <label>Nombre</label>
        <br />
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Descripción</label>
        <br />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Color</label>
        <br />
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
      </div>

      <div>
        <label>Status</label>
        <br />
        <select
          value={status}
          onChange={(e) => setStatus(parseInt(e.target.value, 10))}
        >
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Ícono</label>
        <br />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setIconFile(e.target.files?.[0] || null)}
        />
      </div>

      <br />
      <button type="submit" disabled={loading}>
        {loading ? 'Enviando...' : 'Crear'}
      </button>

      <FeedbackModal
        open={modalOpen}
        type={modalType}
        title={modalType === 'success' ? 'Éxito' : 'Error'}
        message={modalMsg}
        onClose={closeModal}
        autoClose={modalType === 'success'}
      />
    </form>
  );
}
