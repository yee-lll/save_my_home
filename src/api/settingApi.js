import http from "./http";

export const getSetting = async () => (await http.get("/set")).data;
export const listSettingNotice = async () => (await http.get("/set/notice")).data;
export const listSettingFAQ = async () => (await http.get("/set/faq")).data;
export const deleteUserBySetting = (userId) =>
  http.delete(`/set/user/${encodeURIComponent(userId)}`);
export const getServiceInfo = async () => (await http.get("/set/info")).data;