import http from './http';
//목록
export const getUsers = async () => {
  const { data } = await http.get('/admin'); 
  return data;
};
//생성
export const createUser = async (payload) => {
  const { data } = await http.post('/admin', payload);
  return data;
};
//수정
export const updateUser = async (userId, payload) => {
  const { data } = await http.put(`/admin/${encodeURIComponent(userId)}`, payload);
  return data;
};
//삭제
export const deleteUser = async (userId) => {
  const { data } = await http.delete(`/admin/${encodeURIComponent(userId)}`);
  return data;
};
