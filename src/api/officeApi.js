import http from "./http";
//검색
export const searchOffice = async (params = {}) => {
  const qs = new URLSearchParams(params).toString();
  return (await http.get(`/office${qs ? `?${qs}` : ""}`)).data;
};
//목록
export const getOffice = async (id) =>
  (await http.get(`/office/${encodeURIComponent(id)}`)).data;