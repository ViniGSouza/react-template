/**
 * API Configuration
 * Configuração do cliente axios
 */

import axios from "axios";
import { storage } from "@/core/storage";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para adicionar token em todas as requisições
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

// Interceptor para tratar erros de resposta
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Servidor respondeu com status code fora do range 2xx
      const message =
        error.response.data?.message || "Erro ao processar requisição";
      throw new Error(message);
    } else if (error.request) {
      // Requisição foi feita mas não houve resposta
      throw new Error("Sem resposta do servidor");
    } else {
      // Erro ao configurar a requisição
      throw new Error(error.message || "Erro desconhecido");
    }
  }
);
