import http from "./http";

//목록
export const listNotices = async () =>
  (await http.get("/admin/notice")).data;

//생성
export const createNotice = (payload) =>
  http.post("/admin/notice", payload);

//수정
export const updateNotice = (id, payload) =>
  http.put(`/admin/notice/${encodeURIComponent(id)}`, payload);

//삭제
export const deleteNotice = (id) =>
  http.delete(`/admin/notice/${encodeURIComponent(id)}`);