import http from "./http";

export const createConsult = (payload) => http.post("/cons", payload);
export const listConsult = async (params = {}) => {
  const qs = new URLSearchParams(params).toString();
  return (await http.get(`/cons${qs ? `?${qs}` : ""}`)).data;
};