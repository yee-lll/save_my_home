import axios from "axios";
// 자주묻는 질문 코드
const faqHttp = axios.create({
  baseURL: process.env.REACT_APP_API_BASE, 
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

export const listFAQ = async () => (await faqHttp.get("/admin/faq")).data;
export const createFAQ = (payload) => faqHttp.post("/admin/faq", payload);
export const updateFAQ = (id, payload) =>
  faqHttp.put(`/admin/faq/${encodeURIComponent(id)}`, payload);
export const deleteFAQ = (id) =>
  faqHttp.delete(`/admin/faq/${encodeURIComponent(id)}`);
