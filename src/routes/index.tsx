import { useRoutes, Navigate } from "react-router-dom";
import type { RouteObject } from "react-router-dom";
import { AppLayout } from "@/layouts";
import { ProtectedRoute } from "@/shared/components";
import { authRoutes } from "@/domain/auth/routes";
import { dashboardRoutes } from "@/domain/dashboard/routes";
import { proposalsRoutes } from "@/domain/proposals/routes";

const routes: RouteObject[] = [
  // Rotas públicas
  ...authRoutes,

  // Rotas protegidas
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      ...dashboardRoutes,
      ...proposalsRoutes,
    ],
  },

  // Fallback
  { path: "*", element: <Navigate to="/dashboard" replace /> },
];

export const AppRoutes = () => {
  return useRoutes(routes);
};
