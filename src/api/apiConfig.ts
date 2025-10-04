import axios from "axios";
import { storage } from "@/core/storage";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = storage.get<string>("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const message =
        error.response.data?.message || "Erro ao processar requisição";
      throw new Error(message);
    } else if (error.request) {
      throw new Error("Sem resposta do servidor");
    } else {
      throw new Error(error.message || "Erro desconhecido");
    }
  }
);
