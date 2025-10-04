/**
 * Auth Service (Use Cases)
 * Camada de lógica de negócio - orquestra API calls e storage
 */

import { authApi } from "../api/authApi";
import type { LoginRequest, LoginResponse } from "../types/authTypes";
import { storage } from "@/core/storage";
import type { User } from "@/shared/types";

const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";

// Mock data
const MOCK_USERS = [
  {
    id: "1",
    name: "João Vendedor",
    email: "vendedor@agisales.com",
    password: "123456",
    role: "seller" as const,
  },
  {
    id: "2",
    name: "Maria Gerente",
    email: "gerente@agisales.com",
    password: "123456",
    role: "manager" as const,
  },
];

// Helper para simular delay de rede
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock implementation
const mockLogin = async (data: LoginRequest): Promise<LoginResponse> => {
  await delay(800);

  const mockUser = MOCK_USERS.find(
    (u) => u.email === data.email && u.password === data.password
  );

  if (!mockUser) {
    throw new Error("Credenciais inválidas");
  }

  const token = `mock-token-${mockUser.role}-${Date.now()}`;
  const user: User = {
    id: mockUser.id,
    name: mockUser.name,
    email: mockUser.email,
    role: mockUser.role,
  };

  return { user, token };
};

const mockLogout = async (): Promise<void> => {
  await delay(300);
};

const mockGetMe = async (): Promise<User> => {
  await delay(300);

  const user = storage.get<User>("user");
  if (!user) {
    throw new Error("Não autenticado");
  }

  return user;
};

// Service (Use Cases)
export const authService = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const data = { email, password };

    // Usa mock ou API real baseado no env
    const response = USE_MOCK
      ? await mockLogin(data)
      : await authApi.login(data);

    // Salva no storage (lógica de negócio)
    storage.set("token", response.token);
    storage.set("user", response.user);

    return response;
  },

  logout: async (): Promise<void> => {
    // Chama API
    if (!USE_MOCK) {
      await authApi.logout();
    } else {
      await mockLogout();
    }

    // Limpa storage (lógica de negócio)
    storage.remove("token");
    storage.remove("user");
  },

  getMe: async (): Promise<User> => {
    // Usa mock ou API real
    const user = USE_MOCK ? await mockGetMe() : await authApi.getMe();

    // Atualiza storage (lógica de negócio)
    storage.set("user", user);

    return user;
  },

  isAuthenticated: (): boolean => {
    return !!storage.get<string>("token");
  },

  getCurrentUser: (): User | null => {
    return storage.get<User>("user");
  },
};
