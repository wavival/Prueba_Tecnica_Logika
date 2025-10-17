export default function Loader({ label = 'Cargando...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-slate-500">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-slate-300 border-t-indigo-500"></div>
      <p className="mt-2 text-sm">{label}</p>
    </div>
  );
}
