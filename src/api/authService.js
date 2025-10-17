import { authFetcher } from '@/utils/fetcher';

function classifyLoginError(raw) {
  // Normaliza a string legible
  const msg =
    typeof raw === 'string'
      ? raw
      : raw?.Message || raw?.message || raw?.error || JSON.stringify(raw);

  const lower = (msg || '').toLowerCase();

  // Heurísticas típicas
  if (
    lower.includes('user') ||
    lower.includes('usuario') ||
    lower.includes('email') ||
    lower.includes('correo')
  ) {
    return { field: 'username', message: 'Usuario incorrecto' };
  }
  if (
    lower.includes('password') ||
    lower.includes('contraseña') ||
    lower.includes('base-64')
  ) {
    // Tu backend devolvió "not a valid Base-64..." cuando la contraseña no es válida
    return { field: 'password', message: 'Contraseña incorrecta' };
  }

  // Respuestas como array [{ Message: "..."}]
  if (Array.isArray(raw) && raw[0]?.Message) {
    const m = String(raw[0].Message);
    if (m.toLowerCase().includes('password'))
      return { field: 'password', message: 'Contraseña incorrecta' };
    if (m.toLowerCase().includes('user'))
      return { field: 'username', message: 'Usuario incorrecto' };
    return { field: 'form', message: m };
  }

  return { field: 'form', message: msg || 'Credenciales inválidas' };
}

export const authService = {
  async login({ username, password }) {
    // Hacemos el fetch sin capturar aquí; si falla, procesamos el body de error
    try {
      const data = await authFetcher('/api/Authentication/Login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
      });

      // Extraer token (ajusta si cambia el shape)
      const token =
        data?.token ||
        data?.accessToken ||
        data?.access_token ||
        data?.data?.token ||
        data?.content?.token ||
        (typeof data === 'string' ? data : null);

      if (!token)
        throw new Error('No se encontró token en la respuesta de login');
      return token;
    } catch (e) {
      let raw = e?.message;
      try {
        raw = JSON.parse(e.message);
      } catch {}

      const { field, message } = classifyLoginError(raw);
      const err = new Error(message);
      err.field = field;
      throw err;
    }
  },
};
