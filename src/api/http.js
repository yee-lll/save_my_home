import axios from 'axios';
const API_BASE =
  process.env.REACT_APP_API_BASE ||
  (typeof window !== 'undefined' ? window.__API_BASE__ : '') ||
  '';

const http = axios.create({
  baseURL: API_BASE,               
  headers: { 'Content-Type': 'application/json' },
});

export default http;