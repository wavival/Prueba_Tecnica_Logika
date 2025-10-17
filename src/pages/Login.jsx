import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { authService } from '@/api/authService';
import ErrorMessage from '@/components/ErrorMessage';
import logo from '@/assets/logos/logo.svg';
import mailIcon from '@/assets/icons/mail.svg';
import lockIcon from '@/assets/icons/password.svg';
import seePass from '@/assets/icons/see-password.svg';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userError, setUserError] = useState('');
  const [passError, setPassError] = useState('');
  const [formError, setFormError] = useState('');
  const [loading, setLoading] = useState(false);

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
    <div className="grid min-h-screen place-items-center bg-slate-50 p-6 w-full mx-auto">
      <div className="w-[520px] rounded-2xl border border-slate-200 bg-white p-8 shadow-xl flex flex-col gap-5">
        <div className="mb-4 flex justify-center">
          <img src={logo} className="h-18" alt="Be Kind" />
        </div>
        <h1 className="text-center text-2xl text-slate-900">
          ¡Empieza a conectar tu comunidad ante
          <br />
          buenas acciones!
        </h1>

        <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-8">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Correo Electrónico*
            </label>
            <div className="relative">
              <img
                src={mailIcon}
                alt="Mail icon"
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 opacity-60"
              />
              <input
                type="email"
                className="w-full rounded-md border border-slate-300 pl-10 pr-3 py-2 text-sm focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                placeholder="Ingresar correo"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  if (userError) setUserError('');
                }}
                required
              />
            </div>
            <ErrorMessage show={!!userError}>{userError}</ErrorMessage>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Contraseña*
            </label>
            <div className="relative">
              <img
                src={lockIcon}
                alt="Password icon"
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 opacity-60"
              />
              <input
                type="password"
                className="w-full rounded-md border border-slate-300 pl-10 pr-3 py-2 text-sm focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (passError) setPassError('');
                }}
                required
              />
              <img
                src={seePass}
                alt="See password icon"
                className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 opacity-60"
              />
            </div>
            <ErrorMessage show={!!passError}>{passError}</ErrorMessage>
          </div>

          {formError && <ErrorMessage show>{formError}</ErrorMessage>}

          <div className="text-center">
            <button
              type="button"
              className="text-sm text-indigo-900 underline underline-offset-2 hover:text-indigo-700 cursor-pointer"
            >
              Recuperar contraseña
            </button>
          </div>

          <button
            type="submit"
            disabled={loading || !username || !password} // 👈 deshabilita si está cargando o campos vacíos
            className={`w-[260px] mx-auto rounded-md px-4 py-3 text-sm font-medium text-white transition-colors cursor-pointer
            ${
              loading || !username || !password
                ? 'bg-slate-300 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700'
            }
          `}
          >
            {loading ? 'Ingresando…' : 'Ingresar'}
          </button>
        </form>
      </div>
    </div>
  );
}
