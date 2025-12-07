import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE || "https://techreto-back-production.up.railway.app/api";

export const api = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" }
});

// Añade el token si existe
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("tr_token");
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Manejo simple de 401
api.interceptors.response.use(
  (r) => r,
  (err) => {
    if (err?.response?.status === 401) {
      localStorage.removeItem("tr_token");
      localStorage.removeItem("tr_user");
    }
    return Promise.reject(err);
  }
);
