import { useEffect, useMemo, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { actionsService } from '@/api/actionsService';
import search from '@/assets/icons/search.svg';
import filter from '@/assets/icons/filter.svg';
import edit from '@/assets/icons/edit.svg';
import trash from '@/assets/icons/trash.svg';
import more from '@/assets/icons/join.svg';
import arrowRight from '@/assets/icons/arrow-right.svg';
import arrowLeft from '@/assets/icons/arrow-left.svg';

const statusLabel = (s) => {
  if (typeof s === 'number') return s === 1 ? 'Activo' : 'Inactivo';
  if (String(s).toUpperCase() === 'ACTIVE') return 'Activo';
  if (String(s).toUpperCase() === 'INACTIVE') return 'Inactivo';
  return String(s);
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [tab, setTab] = useState('Categorías');
  const [q, setQ] = useState('');

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

  const hasPrev = useMemo(() => pageNumber > 1, [pageNumber]);
  const hasNext = useMemo(
    () => total > pageNumber * pageSize,
    [total, pageNumber, pageSize],
  );

  const filtered = useMemo(() => {
    if (!q.trim()) return items;
    const t = q.toLowerCase();
    return items.filter(
      (a) =>
        (a.name || '').toLowerCase().includes(t) ||
        (a.description || '').toLowerCase().includes(t),
    );
  }, [items, q]);

  return (
    <main className="space-y-6">
      {}
      <h1 className="text-3xl font-bold text-gray-900">Categorías</h1>

      {}
      <header className="border-b border-gray-200">
        <nav className="flex gap-6 text-sm font-medium">
          {['Categorías', 'Tipos', 'Evidencias'].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`-mb-px pb-2 ${
                tab === t
                  ? 'border-b-2 border-indigo-700 text-indigo-700'
                  : 'text-gray-500 hover:text-indigo-600'
              }`}
            >
              {t}
            </button>
          ))}
        </nav>
      </header>

      {}
      <section className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={search}
              alt="Search icon"
              className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2"
            />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar"
              className="w-64 rounded-md border border-gray-300 pl-10 pr-3 py-2 text-sm focus:border-indigo-400 focus:ring-1 focus:ring-indigo-100"
            />
          </div>
          <button
            type="button"
            className="rounded shover:bg-gray-50 p-5 text-gray-700 hover:text-indigo-700 cursor-pointer relative"
          >
            <img
              src={filter}
              alt="Filter icon"
              className="h-5 w-5 absolute -left-1 top-1/2 transform -translate-y-1/2"
            />
            Filtros
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/create')}
            className="rounded-md bg-indigo-900 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 cursor-pointer"
          >
            Crear tipo de categoría
          </button>
        </div>
      </section>

      {}
      <section className="overflow-hidden rounded-lg border border-gray-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full table-auto text-left text-sm">
            <thead className="bg-gray-50 text-xs font-medium text-gray-600">
              <tr>
                <th className="px-4 py-3">Nombre de la categoría</th>
                <th className="px-4 py-3">Ícono de la categoría</th>
                <th className="px-4 py-3">Estado</th>
                <th className="px-4 py-3">Descripción</th>
                <th className="px-4 py-3">Fecha de creación</th>
                <th className="px-4 py-3 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center">
                    Cargando…
                  </td>
                </tr>
              )}

              {error && !loading && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-4 text-center text-rose-600"
                  >
                    {error}
                  </td>
                </tr>
              )}

              {!loading && !error && filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-8 text-center text-gray-500"
                  >
                    Sin resultados.
                  </td>
                </tr>
              )}

              {!loading &&
                !error &&
                filtered.map((a, i) => {
                  const img =
                    a.iconUrl || a.icon || a.imageUrl || a.image || a.iconPath;
                  const status = a.status ?? a.isActive ?? a.enabled;
                  const created =
                    a.createdAt || a.creationDate || a.created || '';

                  return (
                    <tr key={a.id || a.uuid || i} className="text-gray-800">
                      <td className="px-4 py-3">
                        <div className="font-medium">{a.name}</div>
                        <div className="text-gray-500 text-xs"></div>
                      </td>

                      <td className="px-4 py-3">
                        {img ? (
                          <img
                            src={img}
                            alt={a.name}
                            className="h-6 w-6 rounded object-cover"
                          />
                        ) : (
                          '—'
                        )}
                      </td>

                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center justify-center rounded-md border px-3 py-0.5 text-xs font-medium ${
                            statusLabel(status) === 'Activo'
                              ? 'border-green-300 bg-green-100 text-green-800'
                              : 'border-gray-300 bg-gray-100 text-gray-600'
                          }`}
                        >
                          {statusLabel(status)}
                        </span>
                      </td>

                      <td className="px-4 py-3 text-gray-700">
                        {a.description}
                      </td>

                      <td className="px-4 py-3 text-gray-500">
                        {created
                          ? new Date(created).toLocaleDateString('es-ES', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })
                          : '—'}
                      </td>

                      <td className="px-4 py-3">
                        <div className="flex items-center justify-center gap-3 text-gray-500">
                          <button
                            className="relative rounded shover:bg-gray-50 p-5"
                            title="Editar"
                          >
                            <img
                              src={edit}
                              alt="Edit icon"
                              className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2"
                            />
                          </button>
                          <button
                            className="relative rounded shover:bg-gray-50 p-5"
                            title="Eliminar"
                          >
                            <img
                              src={trash}
                              alt="Delete icon"
                              className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2"
                            />
                          </button>
                          <button
                            className="relative rounded shover:bg-gray-50 p-5"
                            title="Ver"
                          >
                            <img
                              src={more}
                              alt="more icon"
                              className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2"
                            />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>

        {}
        <div className="flex items-center justify-center border-t border-gray-200 px-4 py-3 text-sm text-gray-600 gap-8">
          <div className="flex items-center gap-2">
            <span>Resultados por página</span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(parseInt(e.target.value, 10));
                setPageNumber(1);
              }}
              className="rounded border border-gray-300 px-2 py-1 text-sm"
            >
              {[10, 20, 30].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>

          <div>
            {total === 0
              ? '0'
              : `${(pageNumber - 1) * pageSize + 1} - ${Math.min(
                  pageNumber * pageSize,
                  total,
                )} de ${total}`}
          </div>

          <div className="flex items-center gap-6 justify-center">
            <button
              disabled={!hasPrev}
              onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
              className="relative px-2 py-1 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              title="Anterior"
            >
              <img
                src={arrowLeft}
                alt="left icon"
                className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2"
              />
            </button>
            <button
              disabled={!hasNext}
              onClick={() => setPageNumber((p) => p + 1)}
              className="relative px-2 py-1 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              title="Siguiente"
            >
              <img
                src={arrowRight}
                alt="right icon"
                className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2"
              />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
