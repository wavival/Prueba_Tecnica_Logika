import { useAuth } from '@/hooks/useAuth';

export default function App() {
  const { isAuthReady } = useAuth();

  if (!isAuthReady) return <h3>Cargando autenticación...</h3>;
  return;
}
