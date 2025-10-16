export default function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-200">
      <h1 className="text-5xl font-bold text-blue-600 underline mb-6">
        Tailwind OK ✅
      </h1>
      <div className="space-x-4">
        <span className="bg-red-500 text-white px-4 py-2 rounded">Rojo</span>
        <span className="bg-green-500 text-white px-4 py-2 rounded">Verde</span>
        <span className="bg-blue-500 text-white px-4 py-2 rounded">Azul</span>
      </div>
    </div>
  );
}
