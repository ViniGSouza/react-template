/**
 * Auth Types
 * Tipos específicos do domínio de autenticação
 */

import type { User } from "@/shared/types";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}
