import { apiFetcher } from '@/utils/fetcher';

/**
 * Endpoints:
 * - GET  /api/v1/actions/admin-list  (paginado)
 * - POST /api/v1/actions/admin-add   (multipart/form-data)
 */
export const actionsService = {
  async getActions({
    pageNumber = 1,
    pageSize = 10,
    orderBy = 'createdAt',
    sort = 'DESC',
  } = {}) {
    const qs = new URLSearchParams({
      pageNumber,
      pageSize,
      orderBy,
      sort,
    }).toString();
    return await apiFetcher(`/api/v1/actions/admin-list?${qs}`, {
      method: 'GET',
    });
  },

  async createAction({ name, description, color, status, iconFile }) {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('color', color);
    formData.append('status', status);
    if (iconFile) formData.append('icon', iconFile); // el backend espera 'icon'

    // ¡NO pongas Content-Type! el navegador lo setea con boundary
    return await apiFetcher('/api/v1/actions/admin-add', {
      method: 'POST',
      body: formData,
    });
  },
};
