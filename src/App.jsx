import { useAuth } from '@/hooks/useAuth';

export default function App() {
  const { token, isAuthReady } = useAuth();

  if (!isAuthReady) return <div>Cargando autenticación...</div>;

  console.log('Token en contexto:', token);
  return <div>Sesión iniciada</div>;
}
