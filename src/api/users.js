import { http } from "./http";

export const UsersAPI = {
  list: (page=1, size=20, query="") =>
    http.get(`/users?page=${page}&size=${size}&query=${encodeURIComponent(query)}`),
  get: (id) => http.get(`/users/${id}`),
  create: (payload) => http.post(`/users`, payload),
  update: (id, payload) => http.put(`/users/${id}`, payload),
  remove: (id) => http.del(`/users/${id}`),
};
