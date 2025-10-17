import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import logoBanner from '@/assets/logos/logo-bg.svg';
import iconHome from '@/assets/icons/home.svg';
import iconImpacto from '@/assets/icons/insights.svg';
import iconComunidad from '@/assets/icons/community.svg';
import iconSponsors from '@/assets/icons/money.svg';
import iconMarketplace from '@/assets/icons/store.svg';
import iconBakanes from '@/assets/icons/premium.svg';
import iconContenidos from '@/assets/icons/copy.svg';
import iconCategorias from '@/assets/icons/category.svg';
import iconLogout from '@/assets/icons/logout.svg';

export default function Sidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const items = [
    { id: 'home', label: 'Home', to: '#', icon: iconHome },
    { id: 'impacto', label: 'Impacto Social', to: '#', icon: iconImpacto },
    { id: 'comunidad', label: 'Comunidad', to: '#', icon: iconComunidad },
    { id: 'sponsors', label: 'Sponsors', to: '#', icon: iconSponsors },
    { id: 'market', label: 'Marketplace', to: '#', icon: iconMarketplace },
    { id: 'bakanes', label: 'Bakanes', to: '/dashboard', icon: iconBakanes },
    { id: 'contenidos', label: 'Contenidos', to: '#', icon: iconContenidos },
    {
      id: 'categorias',
      label: 'Categorías de acciones',
      to: '#',
      icon: iconCategorias,
    },
  ];

  const base =
    'relative flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors';

  return (
    <aside className="flex w-64 flex-col border-r border-gray-200 bg-white">
      {}
      <div className="h-38 w-full overflow-hidden">
        <img src={logoBanner} alt="" className="h-full w-full object-cover" />
      </div>

      <nav className="mt-2 flex-1 space-y-1 px-2">
        {items.map((item) => {
          const isSelected =
            item.id === 'bakanes' && location.pathname.startsWith('/dashboard');

          const className = [
            base,
            isSelected
              ? 'bg-cyan-50 text-gray-900'
              : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600',
          ].join(' ');

          const isPlaceholder = item.to === '#';

          return isPlaceholder ? (
            <button
              key={item.id}
              type="button"
              className={className}
              onClick={(e) => e.preventDefault()}
            >
              <span
                className={`absolute left-0 top-0 h-full w-1 rounded-r ${
                  isSelected ? 'bg-cyan-400' : 'bg-transparent'
                }`}
              />
              <img src={item.icon} alt="" className="h-4 w-4" />
              <span>{item.label}</span>
            </button>
          ) : (
            <NavLink key={item.id} to={item.to} className={className}>
              <span
                className={`absolute left-0 top-0 h-full w-1 rounded-r ${
                  isSelected ? 'bg-cyan-400' : 'bg-transparent'
                }`}
              />
              <img src={item.icon} alt="" className="h-4 w-4" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {}
      <button
        onClick={() => {
          logout();
          navigate('/login');
        }}
        className="m-3 mt-auto flex items-center gap-3 rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
      >
        <img src={iconLogout} className="h-4 w-4" alt="" />
        Cerrar sesión
      </button>
    </aside>
  );
}
