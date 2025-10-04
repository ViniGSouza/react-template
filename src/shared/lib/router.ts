import { createBrowserRouter, type RouteObject } from "react-router-dom";
import type { AppRouteObject } from "@/shared/types";

export const createAppRouter = (routes: AppRouteObject[]) => {
  return createBrowserRouter(routes as RouteObject[]);
};
