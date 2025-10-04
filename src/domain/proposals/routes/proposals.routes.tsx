import type { RouteObject } from "react-router-dom";
import { ProposalsPage } from "../pages";

export const proposalsRoutes: RouteObject[] = [
  {
    path: "proposals",
    element: <ProposalsPage />,
  },
];
