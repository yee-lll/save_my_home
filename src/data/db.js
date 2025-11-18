const API_BASE = 'http://localhost:4000/api';
async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API ${res.status}: ${text}`);
  }
  return res.json();
}

export const LawAPI = {
  list: () => request('/laws'),
  create: (data) => request('/laws', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => request(`/laws/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  remove: (id) => request(`/laws/${id}`, { method: 'DELETE' }),
};
