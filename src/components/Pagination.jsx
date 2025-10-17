// src/components/Pagination.jsx

export default function Pagination({ page, pageSize, total, onPrev, onNext }) {
  const totalPages = Math.ceil(total / pageSize) || 1;

  return (
    <div className="flex items-center justify-center gap-3 text-sm">
      <button
        onClick={onPrev}
        disabled={page <= 1}
        className="rounded border border-gray-300 px-3 py-1 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Anterior
      </button>

      <span>
        Página <strong>{page}</strong> de <strong>{totalPages}</strong>
      </span>

      <button
        onClick={onNext}
        disabled={page >= totalPages}
        className="rounded border border-gray-300 px-3 py-1 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Siguiente
      </button>
    </div>
  );
}
