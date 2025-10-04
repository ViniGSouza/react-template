import { Outlet } from "react-router-dom";
import type { AppRouteObject } from "@/shared/types";
import { ProposalsPage, ProposalDetailPage } from "../pages";

export const proposalsRoutes: AppRouteObject[] = [
  {
    path: "proposals",
    element: <Outlet />,
    handle: {
      title: "Propostas",
      breadcrumb: "Propostas",
      icon: "FileText",
    },
    children: [
      {
        index: true,
        element: <ProposalsPage />,
      },
      {
        path: ":id",
        element: <ProposalDetailPage />,
        handle: {
          title: "Detalhes da Proposta",
          breadcrumb: "Detalhes",
          icon: "FileText",
        },
      },
    ],
  },
];
