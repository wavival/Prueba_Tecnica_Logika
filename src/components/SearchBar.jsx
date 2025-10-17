import searchIcon from '@/assets/icons/search.svg';

export default function SearchBar({ value, onChange, placeholder = 'Buscar' }) {
  return (
    <div className="relative">
      <img
        src={searchIcon}
        alt="Buscar"
        className="absolute left-3 top-1/2 h-8 w-8 -translate-y-1/2"
      />
      <input
        type="text"
        className="w-64 rounded-md border border-gray-300 pl-9 pr-3 py-2 text-sm focus:border-indigo-400 focus:ring-1 focus:ring-indigo-100"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
