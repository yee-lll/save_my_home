import axios from "axios";

const api = axios.create({
  baseURL:
    process.env.REACT_APP_API_BASE || "http://ceprj.gachon.ac.kr:60003",
  headers: { "Content-Type": "application/json" },
});

export const confirmBilling = (payload) =>
  api.post("/api/sub/billing/confirm", payload).then((r) => r.data);

export const chargeAgain = (payload) =>
  api.post("/api/sub/billing/charge", payload).then((r) => r.data);


export const cancelSubscription = (userId) =>
  api.delete("/api/sub/cancel", { data: { userId } }).then((r) => r.data);
