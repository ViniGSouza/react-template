import { describe, it, expect, beforeEach } from "vitest";
import { authService } from "../services/authService";
import { storage } from "@/core/storage";

describe("Auth Service", () => {
  beforeEach(() => {
    storage.clear();
  });

  describe("login", () => {
    it("deve fazer login com credenciais válidas de vendedor", async () => {
      const result = await authService.login("vendedor@example.com", "123456");

      expect(result).toHaveProperty("user");
      expect(result).toHaveProperty("token");
      expect(result.user.email).toBe("vendedor@example.com");
      expect(result.user.role).toBe("seller");
      expect(result.token).toContain("mock-token");

      const storedToken = storage.get<string>("token");
      const storedUser = storage.get("user");
      expect(storedToken).toBe(result.token);
      expect(storedUser).toEqual(result.user);
    });

    it("deve fazer login com credenciais válidas de gerente", async () => {
      const result = await authService.login("gerente@example.com", "123456");

      expect(result.user.role).toBe("manager");
      expect(result.user.email).toBe("gerente@example.com");
    });

    it("deve lançar erro com credenciais inválidas", async () => {
      await expect(
        authService.login("invalido@email.com", "senhaerrada")
      ).rejects.toThrow("Credenciais inválidas");
    });

    it("deve lançar erro com senha incorreta", async () => {
      await expect(
        authService.login("vendedor@example.com", "senhaerrada")
      ).rejects.toThrow("Credenciais inválidas");
    });
  });

  describe("logout", () => {
    it("deve fazer logout e limpar o storage", async () => {
      await authService.login("vendedor@example.com", "123456");

      expect(storage.get("token")).not.toBeNull();
      expect(storage.get("user")).not.toBeNull();

      await authService.logout();

      expect(storage.get("token")).toBeNull();
      expect(storage.get("user")).toBeNull();
    });
  });

  describe("getMe", () => {
    it("deve retornar o usuário atual se autenticado", async () => {
      const loginResult = await authService.login(
        "vendedor@example.com",
        "123456"
      );

      const user = await authService.getMe();

      expect(user).toEqual(loginResult.user);
    });

    it("deve lançar erro se não estiver autenticado", async () => {
      storage.clear();

      await expect(authService.getMe()).rejects.toThrow("Não autenticado");
    });
  });
});
