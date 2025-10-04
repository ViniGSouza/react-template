import { http, HttpResponse } from "msw";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export const handlers = [
  http.post(`${API_URL}/auth/login`, async ({ request }) => {
    const body = (await request.json()) as { email: string; password: string };

    if (body.email === "vendedor@agisales.com" && body.password === "123456") {
      return HttpResponse.json({
        user: {
          id: "1",
          name: "João Vendedor",
          email: "vendedor@agisales.com",
          role: "seller",
        },
        token: "mock-token-seller-123",
      });
    }

    if (body.email === "gerente@agisales.com" && body.password === "123456") {
      return HttpResponse.json({
        user: {
          id: "2",
          name: "Maria Gerente",
          email: "gerente@agisales.com",
          role: "manager",
        },
        token: "mock-token-manager-456",
      });
    }

    return HttpResponse.json(
      { message: "Credenciais inválidas" },
      { status: 401 }
    );
  }),

  http.post(`${API_URL}/auth/logout`, () => {
    return HttpResponse.json({ message: "Logout realizado com sucesso" });
  }),

  http.get(`${API_URL}/auth/me`, ({ request }) => {
    const authHeader = request.headers.get("Authorization");

    if (!authHeader) {
      return HttpResponse.json({ message: "Não autorizado" }, { status: 401 });
    }

    if (authHeader.includes("seller")) {
      return HttpResponse.json({
        id: "1",
        name: "João Vendedor",
        email: "vendedor@agisales.com",
        role: "seller",
      });
    }

    return HttpResponse.json({
      id: "2",
      name: "Maria Gerente",
      email: "gerente@agisales.com",
      role: "manager",
    });
  }),
];
