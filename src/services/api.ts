import axios from "axios";

const API_BASE = "http://localhost:8080";

export const api = axios.create({
  baseURL: `${API_BASE}/api`
  
});

api.interceptors.request.use(
    (config) => {
  const token = localStorage.getItem("accessToken");

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
    return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      localStorage.removeItem("accessToken");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);