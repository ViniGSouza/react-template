import type { AppRouteObject } from "@/shared/types";
import { LoginPage } from "../pages";

export const authRoutes: AppRouteObject[] = [
  {
    path: "/login",
    element: <LoginPage />,
  },
];
