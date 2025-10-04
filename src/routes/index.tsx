import { Navigate } from "react-router-dom";
import { AppLayout } from "@/layouts";
import { ProtectedRoute } from "@/shared/components";
import type { AppRouteObject } from "@/shared/types";
import { authRoutes } from "@/domain/auth/routes";
import { dashboardRoutes } from "@/domain/dashboard/routes";
import { proposalsRoutes } from "@/domain/proposals/routes";

export const routes: AppRouteObject[] = [
  ...authRoutes,
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
  { path: "*", element: <Navigate to="/dashboard" replace /> },
];
