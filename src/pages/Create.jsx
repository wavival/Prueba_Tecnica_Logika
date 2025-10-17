// src/pages/Create.jsx
import { useState } from 'react';
import { actionsService } from '@/api/actionsService';
import { useNavigate } from 'react-router-dom';
import FeedbackModal from '@/components/FeedbackModal';
import { mapApiError } from '@/utils/errorMapper';
import ActionForm from '@/components/ActionForm'; // usa el form componetizado

export default function Create() {
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({ open: false, type: 'success', msg: '' });
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await actionsService.createAction(values);
      setModal({ open: true, type: 'success', msg: 'Acción creada con éxito' });
    } catch (err) {
      setModal({
        open: true,
        type: 'error',
        msg: mapApiError(err, 'CREATE_ACTION'),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl p-6">
      <div className="mb-4 flex items-center">
        <button
          onClick={() => navigate('/dashboard')}
          className="rounded border px-3 py-2 text-sm hover:bg-gray-50"
        >
          ← Volver al Dashboard
        </button>
      </div>
      <h1 className="mb-4 text-2xl font-semibold">Crear Acción</h1>

      <ActionForm loading={loading} onSubmit={handleSubmit} />

      <FeedbackModal
        open={modal.open}
        type={modal.type}
        title={modal.type === 'success' ? 'Éxito' : 'Error'}
        message={modal.msg}
        onClose={() => {
          setModal((m) => ({ ...m, open: false }));
          if (modal.type === 'success')
            navigate('/dashboard', { state: { refresh: Date.now() } });
        }}
      />
    </div>
  );
}
