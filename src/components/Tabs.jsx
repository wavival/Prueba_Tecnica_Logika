export default function Tabs({ tabs, active, onChange }) {
  return (
    <header className="border-b border-gray-200 mb-4">
      <nav className="flex gap-6 text-sm font-medium">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onChange(tab)}
            className={`pb-2 transition-colors ${
              active === tab
                ? 'border-b-2 border-indigo-700 text-indigo-700'
                : 'text-gray-500 hover:text-indigo-600'
            }`}
          >
            {tab}
          </button>
        ))}
      </nav>
    </header>
  );
}
