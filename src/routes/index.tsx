/**
 * Routes Configuration
 * Configuração centralizada de rotas da aplicação
 */

import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage, DashboardPage, ProposalsPage } from "@/pages";
import { AppLayout } from "@/layouts";
import { ProtectedRoute } from "@/shared/components";

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Rota pública */}
      <Route path="/login" element={<LoginPage />} />

      {/* Rotas protegidas */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="proposals" element={<ProposalsPage />} />
      </Route>

      {/* Fallback - redireciona para dashboard */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};
