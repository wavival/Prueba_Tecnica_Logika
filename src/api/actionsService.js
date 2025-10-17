// src/api/actionsService.js
import { apiFetcher } from '@/utils/fetcher';

function normalizeActionsList(raw) {
  if (raw && raw.data && Array.isArray(raw.data.data)) {
    return {
      items: raw.data.data,
      total: Number(raw.data.totalElements) || raw.data.data.length || 0,
      pageNumber: Number(raw.data.pageNumber) || 1,
      pageSize: Number(raw.data.pageSize) || 10,
      totalPages: Number(raw.data.totalPages) || 1,
    };
  }
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
  async getActions({
    pageNumber = 1,
    pageSize = 10,
    orderBy = 'createdAt',
    sort = 'DESC',
  } = {}) {
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

  async createAction(input) {
    const values = {
      name: input.name,
      description: input.description,
      color: (input.color || '').replace(/^#/, ''),
      active:
        typeof input.active === 'boolean'
          ? input.active
          : String(input.status) === '1',
      logo: input.logo ?? input.iconFile ?? null,
    };

    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('description', values.description);
    formData.append('color', values.color);
    formData.append('status', values.active ? 1 : 0);
    if (values.logo instanceof File)
      formData.append('icon', values.logo, values.logo.name);

    return apiFetcher('/api/v1/actions/admin-add', {
      method: 'POST',
      body: formData,
    });
  },
};
