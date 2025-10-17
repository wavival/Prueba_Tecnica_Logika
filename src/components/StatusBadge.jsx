export default function StatusBadge({ status }) {
  const isActive = String(status).toLowerCase() === 'activo' || status === 1;
  return (
    <span
      className={`inline-flex items-center justify-center rounded-md border px-3 py-0.5 text-xs font-medium ${
        isActive
          ? 'border-green-300 bg-green-100 text-green-800'
          : 'border-gray-300 bg-gray-100 text-gray-600'
      }`}
    >
      {isActive ? 'Activo' : 'Inactivo'}
    </span>
  );
}
