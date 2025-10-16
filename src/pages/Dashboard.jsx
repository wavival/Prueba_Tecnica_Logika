import { useEffect, useState } from 'react';
import { actionsService } from '@/api/actionsService';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

export default function Dashboard() {
  const [items, setItems] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(10);
  const [loading, setLoading] = useState(true);
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    let active = true;
    setLoading(true);
    actionsService
      .getActions({ pageNumber, pageSize, orderBy: 'createdAt', sort: 'DESC' })
      .then((data) => {
        if (!active) return;
        // Ajusta según shape real. Intentamos soportar varias formas:
        const rows =
          data?.items ||
          data?.data ||
          data?.content ||
          data?.results ||
          data ||
          [];
        setItems(Array.isArray(rows) ? rows : []);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => active && setLoading(false));

    return () => {
      active = false;
    };
  }, [pageNumber, pageSize]);

  return (
    <div style={{ padding: 24 }}>
      <h1>Dashboard</h1>
      <button onClick={() => navigate('/create')}>Crear acción</button>
      <button
        onClick={() => {
          logout();
          navigate('/login');
        }}
        style={{ marginLeft: 8 }}
      >
        Logout
      </button>

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <table border="1" cellPadding="8" style={{ marginTop: 16 }}>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Imagen</th>
              <th>Color</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {items.map((a, i) => (
              <tr key={a.id || i}>
                <td>{a.name}</td>
                <td>{a.description}</td>
                <td>
                  {a.iconUrl || a.imageUrl ? (
                    <img
                      src={a.iconUrl || a.imageUrl}
                      alt={a.name}
                      width="40"
                    />
                  ) : (
                    '-'
                  )}
                </td>
                <td>
                  <span
                    style={{
                      display: 'inline-block',
                      width: 16,
                      height: 16,
                      background: a.color,
                      border: '1px solid #ccc',
                    }}
                  />
                  &nbsp;{a.color}
                </td>
                <td>{String(a.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div style={{ marginTop: 12 }}>
        <button
          disabled={pageNumber === 1}
          onClick={() => setPageNumber((p) => p - 1)}
        >
          Anterior
        </button>
        <span style={{ margin: '0 8px' }}>Página {pageNumber}</span>
        <button onClick={() => setPageNumber((p) => p + 1)}>Siguiente</button>
      </div>
    </div>
  );
}
