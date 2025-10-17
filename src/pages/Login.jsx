import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { authService } from '@/api/authService';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // errores por campo
  const [userError, setUserError] = useState('');
  const [passError, setPassError] = useState('');
  const [formError, setFormError] = useState('');

  const clearErrors = () => {
    setUserError('');
    setPassError('');
    setFormError('');
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    clearErrors();
    setLoading(true);
    try {
      const token = await authService.login({ username, password });
      login(token);
      navigate('/dashboard');
    } catch (err) {
      if (err.field === 'username') setUserError(err.message);
      else if (err.field === 'password') setPassError(err.message);
      else setFormError(err.message || 'Credenciales inválidas');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} style={{ padding: 24, maxWidth: 360 }}>
      <h1>Login</h1>

      <label>
        Usuario (email)
        <input
          style={{ display: 'block', width: '100%', marginTop: 4 }}
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            if (userError) setUserError('');
          }}
          autoComplete="username"
          inputMode="email"
        />
      </label>
      {userError && (
        <div style={{ color: 'red', fontSize: 13, marginTop: 4 }}>
          {userError}
        </div>
      )}

      <div style={{ height: 10 }} />

      <label>
        Contraseña
        <input
          type="password"
          style={{ display: 'block', width: '100%', marginTop: 4 }}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (passError) setPassError('');
          }}
          autoComplete="current-password"
        />
      </label>
      {passError && (
        <div style={{ color: 'red', fontSize: 13, marginTop: 4 }}>
          {passError}
        </div>
      )}

      {formError && (
        <div style={{ color: 'red', fontSize: 13, marginTop: 8 }}>
          {formError}
        </div>
      )}

      <div style={{ height: 12 }} />
      <button type="submit" disabled={loading} style={{ width: '100%' }}>
        {loading ? 'Ingresando...' : 'Ingresar'}
      </button>
    </form>
  );
}
