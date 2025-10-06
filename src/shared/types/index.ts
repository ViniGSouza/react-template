import type { RouteObject } from "react-router-dom";

export interface RouteHandle {
  title?: string;
  breadcrumb?: string;
  icon?: string;
  showInMenu?: boolean;
  roles?: string[];
  permissions?: string[];
}

export interface AppRouteObject
  extends Omit<RouteObject, "children" | "handle" | "index"> {
  index?: boolean;
  handle?: RouteHandle;
  children?: AppRouteObject[];
}
