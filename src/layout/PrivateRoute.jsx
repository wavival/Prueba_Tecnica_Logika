import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '@/context/AuthContext';
import Sidebar from '@/layout/SideBar';
import logoWhite from '@/assets/logos/logo-white.svg';
import avatar from '@/assets/icons/avatar.svg';

export default function PrivateLayout({ children }) {
  const { token, isAuthReady } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthReady && !token) {
      navigate('/login', { replace: true });
    }
  }, [isAuthReady, token, navigate]);

  if (!isAuthReady) {
    return (
      <div className="grid min-h-screen place-items-center text-slate-600">
        Cargando…
      </div>
    );
  }

  if (!token) return null;

  return (
    <main className="min-h-screen flex flex-col bg-slate-50">
      {}
      <div className="h-16 bg-[#201c46] flex items-center justify-between px-8">
        <img src={logoWhite} alt="Be Kind" className="h-8" />

        {}
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-400 text-[#201c46] font-semibold">
          <img src={avatar} alt="Avatar" className="h-8 w-8 rounded-full" />
        </div>
      </div>

      {}
      <section className="flex flex-1 min-h-0">
        {}
        <Sidebar />
        <main className="flex-1 min-h-0 overflow-auto">
          <section className="mx-auto max-w-7xl p-6">{children}</section>
        </main>
      </section>
    </main>
  );
}
