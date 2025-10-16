import { useState } from 'react';
import { actionsService } from '@/api/actionsService';
import { useNavigate } from 'react-router-dom';

export default function Create() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('#2f80ed');
  const [status, setStatus] = useState('ACTIVE');
  const [iconFile, setIconFile] = useState(null);
  const [loading, setLoading] = useState(false);
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
      alert('Acción creada con éxito');
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      alert(err.message || 'Error creando acción');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} style={{ padding: 24 }}>
      <h1>Crear Acción</h1>

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
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="ACTIVE">ACTIVE</option>
          <option value="INACTIVE">INACTIVE</option>
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
    </form>
  );
}
