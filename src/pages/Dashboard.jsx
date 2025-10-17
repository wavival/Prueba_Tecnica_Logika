import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { actionsService } from '@/api/actionsService';
import { useAuth } from '@/hooks/useAuth';

const statusLabel = (s) => {
  // si backend manda 1/0, mapea; si manda string lo mostramos tal cual
  if (typeof s === 'number') return s === 1 ? 'ACTIVE' : 'INACTIVE';
  return String(s);
};

export default function Dashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [pageNumber, setPageNumber] = useState(1); // 1-based en UI
  const [pageSize] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchList = async () => {
    setLoading(true);
    setError('');
    try {
      const { items, total } = await actionsService.getActions({
        pageNumber,
        pageSize,
        orderBy: 'createdAt',
        sort: 'DESC',
      });
      setItems(items);
      setTotal(total);
    } catch (err) {
      setError(err.message || 'Error cargando acciones');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber, pageSize]);

  const hasPrev = useMemo(() => pageNumber > 1, [pageNumber]);
  const hasNext = useMemo(
    () => total > pageNumber * pageSize,
    [total, pageNumber, pageSize],
  );

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
      <button onClick={fetchList} style={{ marginLeft: 8 }}>
        Recargar
      </button>

      {loading && <p style={{ marginTop: 16 }}>Cargando...</p>}
      {error && <p style={{ marginTop: 16, color: 'red' }}>{error}</p>}

      {!loading && !error && (
        <>
          {items.length === 0 ? (
            <p style={{ marginTop: 16 }}>Sin resultados.</p>
          ) : (
            <table
              border="1"
              cellPadding="8"
              style={{ marginTop: 16, width: '100%', maxWidth: 900 }}
            >
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
                {items.map((a, i) => {
                  const img =
                    a.iconUrl || a.icon || a.imageUrl || a.image || a.iconPath;
                  const color = a.color || a.hex || a.colorHex;
                  const status = a.status ?? a.isActive ?? a.enabled;
                  return (
                    <tr key={a.id || a.uuid || i}>
                      <td>{a.name}</td>
                      <td>{a.description}</td>
                      <td>
                        {img ? (
                          <img src={img} alt={a.name} width="40" height="40" />
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
                            verticalAlign: 'middle',
                            background: color || '#ccc',
                            border: '1px solid #ccc',
                            marginRight: 6,
                          }}
                        />
                        {color || '-'}
                      </td>
                      <td>{statusLabel(status)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}

          <div style={{ marginTop: 12 }}>
            <button
              disabled={!hasPrev}
              onClick={() => setPageNumber((p) => p - 1)}
            >
              Anterior
            </button>
            <span style={{ margin: '0 8px' }}>
              Página {pageNumber} · Total {total}
            </span>
            <button
              disabled={!hasNext}
              onClick={() => setPageNumber((p) => p + 1)}
            >
              Siguiente
            </button>
          </div>
        </>
      )}
    </div>
  );
}
