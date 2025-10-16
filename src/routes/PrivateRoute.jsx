import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

export const PrivateRoute = ({ children }) => {
  const { token, isAuthReady } = useAuth();

  if (!isAuthReady) return <div>Cargando autenticación...</div>;
  if (!token) return <Navigate to="/login" replace />;

  return children;
};
