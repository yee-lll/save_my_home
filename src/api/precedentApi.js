import http from './http'; 
//목록
export const listPrecedents = (params) =>
  http.get('/api/precedents', { params }).then(r => r.data);
//검색
export const searchPrecedents = (params) =>
  http.get('/api/precedents/search', { params }).then(r => r.data);
//특정 판례 상세
export const getPrecedent = (id) =>
  http.get(`/api/precedents/${encodeURIComponent(id)}`).then(r => r.data);