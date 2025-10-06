import { dashboardApi } from "../api/dashboardApi";
import type { DashboardMetrics } from "../types";
import { storage } from "@/core/storage";
import { mockProposals } from "@/test/fixtures/proposals.fixture";
import type { Proposal } from "@/domain/proposals/types";

const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const getProposals = (): Proposal[] => {
  const stored = storage.get<Proposal[]>("proposals");
  return stored || mockProposals;
};

const groupByMonth = (proposals: Proposal[]) => {
  const months = new Map<
    string,
    { total: number; approved: number; rejected: number }
  >();

  proposals.forEach((proposal) => {
    const date = new Date(proposal.createdAt);
    const monthKey = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}`;

    if (!months.has(monthKey)) {
      months.set(monthKey, { total: 0, approved: 0, rejected: 0 });
    }

    const stats = months.get(monthKey)!;
    stats.total++;
    if (proposal.status === "approved") stats.approved++;
    if (proposal.status === "rejected") stats.rejected++;
  });

  return Array.from(months.entries())
    .map(([month, stats]) => ({
      month: formatMonth(month),
      ...stats,
    }))
    .slice(-6);
};

const formatMonth = (monthKey: string): string => {
  const [year, month] = monthKey.split("-");
  const months = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ];
  return `${months[parseInt(month) - 1]}/${year.slice(2)}`;
};

const getTopProducts = (proposals: Proposal[]) => {
  const products = new Map<string, { count: number; value: number }>();

  proposals.forEach((proposal) => {
    if (!products.has(proposal.product)) {
      products.set(proposal.product, { count: 0, value: 0 });
    }

    const stats = products.get(proposal.product)!;
    stats.count++;
    if (proposal.status === "approved") {
      stats.value += proposal.value;
    }
  });

  return Array.from(products.entries())
    .map(([name, stats]) => ({ name, ...stats }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);
};

const mockGetMetrics = async (): Promise<DashboardMetrics> => {
  await delay(500);

  const proposals = getProposals();

  const totalProposals = proposals.length;
  const pendingProposals = proposals.filter(
    (p) => p.status === "pending"
  ).length;
  const approvedProposals = proposals.filter(
    (p) => p.status === "approved"
  ).length;
  const rejectedProposals = proposals.filter(
    (p) => p.status === "rejected"
  ).length;

  const totalValue = proposals
    .filter((p) => p.status === "approved")
    .reduce((sum, p) => sum + p.value, 0);

  const approvalRate =
    totalProposals > 0 ? (approvedProposals / totalProposals) * 100 : 0;

  const proposalsByMonth = groupByMonth(proposals);
  const topProducts = getTopProducts(proposals);

  return {
    totalProposals,
    pendingProposals,
    approvedProposals,
    rejectedProposals,
    approvalRate,
    totalValue,
    proposalsByMonth,
    topProducts,
  };
};

export const dashboardService = {
  getMetrics: async (): Promise<DashboardMetrics> => {
    return USE_MOCK ? await mockGetMetrics() : await dashboardApi.getMetrics();
  },
};
