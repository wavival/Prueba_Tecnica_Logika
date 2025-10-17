// src/pages/Dashboard.jsx
import { useEffect, useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { actionsService } from '@/api/actionsService';
import { useAuth } from '@/hooks/useAuth';
import Table from '@/components/Table';
import Pagination from '@/components/Pagination';
import Loader from '@/components/Loader';

const statusLabel = (s) =>
  typeof s === 'number' ? (s === 1 ? 'ACTIVE' : 'INACTIVE') : String(s);

export default function Dashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchList = useCallback(async () => {
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
  }, [pageNumber, pageSize]);

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  const columns = useMemo(
    () => [
      { key: 'name', header: 'Nombre' },
      { key: 'description', header: 'Descripción' },
      {
        key: 'image',
        header: 'Imagen',
        render: (row) => {
          const img =
            row.iconUrl ||
            row.icon ||
            row.imageUrl ||
            row.image ||
            row.iconPath;
          return img ? (
            <img
              src={img}
              alt={row.name}
              className="h-10 w-10 rounded object-cover"
            />
          ) : (
            '—'
          );
        },
      },
      {
        key: 'color',
        header: 'Color',
        render: (row) => {
          const color = row.color || row.hex || row.colorHex;
          return (
            <div className="flex items-center gap-2">
              <span
                className="h-4 w-4 rounded border"
                style={{ background: color || '#ccc' }}
              />
              <span>{color || '—'}</span>
            </div>
          );
        },
      },
      {
        key: 'status',
        header: 'Status',
        render: (row) => {
          const s = row.status ?? row.isActive ?? row.enabled;
          const label = statusLabel(s);
          const ok = label === 'ACTIVE' || s === 1;
          return (
            <span
              className={`rounded px-2 py-0.5 text-xs font-medium ${ok ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}
            >
              {ok ? 'ACTIVE' : 'INACTIVE'}
            </span>
          );
        },
      },
    ],
    [],
  );

  const hasPrev = pageNumber > 1;
  const hasNext = total > pageNumber * pageSize;

  return (
    <div className="mx-auto max-w-5xl p-6">
      <header className="mb-4 flex items-center gap-2">
        <h1 className="mr-auto text-2xl font-semibold">Dashboard</h1>
        <button
          onClick={() => navigate('/create')}
          className="rounded bg-indigo-600 px-3 py-2 text-white hover:bg-indigo-700"
        >
          Crear acción
        </button>
        <button
          onClick={fetchList}
          className="rounded border px-3 py-2 hover:bg-gray-50"
        >
          Recargar
        </button>
        <button
          onClick={() => {
            logout();
            navigate('/login');
          }}
          className="rounded border px-3 py-2 hover:bg-gray-50"
        >
          Logout
        </button>
      </header>

      {loading && <Loader label="Cargando acciones..." />}
      {!!error && !loading && <p className="text-rose-600">{error}</p>}
      {!loading && !error && (
        <>
          <Table
            columns={columns}
            rows={items}
            rowKey={(r, i) => r.id || r.uuid || i}
            emptyText="Sin resultados."
          />
          <div className="mt-3">
            <Pagination
              page={pageNumber}
              pageSize={pageSize}
              total={total}
              onPrev={() => hasPrev && setPageNumber((p) => Math.max(1, p - 1))}
              onNext={() => hasNext && setPageNumber((p) => p + 1)}
            />
          </div>
        </>
      )}
    </div>
  );
}
