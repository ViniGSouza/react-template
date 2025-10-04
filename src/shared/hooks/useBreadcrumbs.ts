import { useMatches } from "react-router-dom";
import type { RouteHandle } from "@/shared/types";

interface BreadcrumbItem {
  title: string;
  path: string;
}

export const useBreadcrumbs = (): BreadcrumbItem[] => {
  const matches = useMatches();

  return matches
    .filter((match) => {
      const handle = match.handle as RouteHandle | undefined;
      return Boolean(handle?.breadcrumb);
    })
    .map((match) => {
      const handle = match.handle as RouteHandle;
      return {
        title: handle.breadcrumb || "",
        path: match.pathname,
      };
    });
};
