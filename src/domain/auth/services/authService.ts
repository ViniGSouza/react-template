import { authApi } from "../api/authApi";
import type { LoginRequest, LoginResponse } from "../types/authTypes";
import { storage } from "@/core/storage";
import type { User } from "@/shared/types";

const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";

const MOCK_USERS = [
  {
    id: "1",
    name: "Vendedor Teste",
    email: "vendedor@agisales.com",
    password: "123456",
    role: "seller" as const,
  },
  {
    id: "2",
    name: "Gerente Teste",
    email: "gerente@agisales.com",
    password: "123456",
    role: "manager" as const,
  },
];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

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

export const authService = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const data = { email, password };

    const response = USE_MOCK
      ? await mockLogin(data)
      : await authApi.login(data);

    storage.set("token", response.token);
    storage.set("user", response.user);

    return response;
  },

  logout: async (): Promise<void> => {
    
    if (!USE_MOCK) {
      await authApi.logout();
    } else {
      await mockLogout();
    }

    storage.remove("token");
    storage.remove("user");
  },

  getMe: async (): Promise<User> => {
    
    const user = USE_MOCK ? await mockGetMe() : await authApi.getMe();

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
