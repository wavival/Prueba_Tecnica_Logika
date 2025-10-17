import { apiFetcher } from '@/utils/fetcher';

// Normaliza la respuesta: { data: { pageSize, pageNumber, totalElements, totalPages, data: [...] } }
function normalizeActionsList(raw) {
  // shape real observado en tus logs:
  // { data: { pageSize: 10, pageNumber: 1, totalElements: 7, totalPages: 1, data: [...] } }
  if (raw && raw.data && Array.isArray(raw.data.data)) {
    return {
      items: raw.data.data,
      total: Number(raw.data.totalElements) || raw.data.data.length || 0,
      pageNumber: Number(raw.data.pageNumber) || 1, // 1-based
      pageSize: Number(raw.data.pageSize) || 10,
      totalPages: Number(raw.data.totalPages) || 1,
    };
  }

  // Fallback defensivo por si cambia el shape
  const items = Array.isArray(raw) ? raw : raw?.items || raw?.data || [];
  return {
    items: Array.isArray(items) ? items : [],
    total: Array.isArray(items) ? items.length : 0,
    pageNumber: 1,
    pageSize: 10,
    totalPages: 1,
  };
}

export const actionsService = {
  /**
   * Lista paginada (la API es 1-based)
   */
  async getActions({
    pageNumber = 1, // 1-based
    pageSize = 10,
    orderBy = 'createdAt',
    sort = 'DESC',
  } = {}) {
    // 👉 NO convertir a 0-based, esta API espera 1,2,3...
    const qs = new URLSearchParams({
      pageNumber: String(pageNumber),
      pageSize: String(pageSize),
      orderBy,
      sort,
    }).toString();

    const raw = await apiFetcher(`/api/v1/actions/admin-list?${qs}`, {
      method: 'GET',
    });
    return normalizeActionsList(raw);
  },

  async createAction({ name, description, color, status, iconFile }) {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('color', color);
    formData.append('status', String(status)); // backend espera Integer
    if (iconFile) formData.append('icon', iconFile);

    return await apiFetcher('/api/v1/actions/admin-add', {
      method: 'POST',
      body: formData,
    });
  },
};
