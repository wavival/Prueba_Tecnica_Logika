import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { authService } from '@/api/authService';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  // puedes precargar el usuario de la prueba para acelerar
  const [username, setUsername] = useState('a.berrio@yopmail.com');
  const [password, setPassword] = useState('AmuFK8G4Bh64Q1uX+IxQhw==');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const token = await authService.login({ username, password });
      login(token); // guarda en contexto + localStorage
      navigate('/dashboard'); // pasa al dashboard
    } catch (err) {
      setError(err.message || 'Error de login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} style={{ padding: 24 }}>
      <h1>Login</h1>
      <input
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button type="submit" disabled={loading}>
        {loading ? 'Ingresando...' : 'Ingresar'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}
