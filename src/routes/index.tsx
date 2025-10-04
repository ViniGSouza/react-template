import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage, DashboardPage, ProposalsPage } from "@/pages";
import { AppLayout } from "@/layouts";
import { ProtectedRoute } from "@/shared/components";

export const AppRoutes = () => {
  return (
    <Routes>
      {}
      <Route path="/login" element={<LoginPage />} />

      {}
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

      {}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};
