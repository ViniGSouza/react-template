import type { RouteObject } from "react-router-dom";
import { DashboardPage } from "../pages";

export const dashboardRoutes: RouteObject[] = [
  {
    path: "dashboard",
    element: <DashboardPage />,
  },
];
