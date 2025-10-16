import { authFetcher } from '@/utils/fetcher';

/**
 * Servicio de autenticación (login)
 */
export const authService = {
  async login({ username, password }) {
    const data = await authFetcher('/api/Authentication/Login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });

    const token =
      data?.token ||
      data?.accessToken ||
      data?.access_token ||
      data?.data?.token ||
      data?.content?.token;

    if (!token) {
      if (typeof data === 'string' && data.trim().length > 0)
        return data.trim();
      throw new Error('No se encontró token en la respuesta de login');
    }

    return token;
  },
};
