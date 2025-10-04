import type { AppRouteObject } from "@/shared/types";
import { DashboardPage } from "../pages";

export const dashboardRoutes: AppRouteObject[] = [
  {
    path: "dashboard",
    element: <DashboardPage />,
    handle: {
      title: "Dashboard",
      breadcrumb: "Início",
      icon: "LayoutDashboard",
    },
  },
];
