import { useDashboard } from "../hooks/useDashboard";
import { MetricCard } from "./MetricCard";
import { ProposalsChart } from "./ProposalsChart";
import { TopProductsChart } from "./TopProductsChart";
import {
  FileText,
  Clock,
  TrendingUp,
  DollarSign,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from "lucide-react";

export const DashboardView = () => {
  const { metrics, isLoading } = useDashboard();

  if (isLoading || !metrics) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground">
            Carregando dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="space-y-2">
        <h2 className="text-4xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-lg text-muted-foreground">
          Visão geral das propostas e métricas em tempo real
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total de Propostas"
          value={metrics.totalProposals}
          subtitle="Todas as propostas"
          icon={<FileText className="h-5 w-5" />}
        />
        <MetricCard
          title="Propostas Pendentes"
          value={metrics.pendingProposals}
          subtitle="Aguardando aprovação"
          icon={<Clock className="h-5 w-5" />}
        />
        <MetricCard
          title="Taxa de Aprovação"
          value={`${metrics.approvalRate.toFixed(1)}%`}
          subtitle="Propostas aprovadas"
          icon={<TrendingUp className="h-5 w-5" />}
        />
        <MetricCard
          title="Valor Total Aprovado"
          value={new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
            notation: "compact",
            compactDisplay: "short",
          }).format(metrics.totalValue)}
          subtitle="Receita potencial"
          icon={<DollarSign className="h-5 w-5" />}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <ProposalsChart data={metrics.proposalsByMonth} />
        <TopProductsChart data={metrics.topProducts} />
      </div>

      <div>
        <h3 className="mb-4 text-xl font-semibold">Status das Propostas</h3>
        <div className="grid gap-4 md:grid-cols-3">
          <MetricCard
            title="Aprovadas"
            value={metrics.approvedProposals}
            subtitle="Propostas aprovadas"
            icon={<CheckCircle2 className="h-5 w-5" />}
            className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20"
          />
          <MetricCard
            title="Rejeitadas"
            value={metrics.rejectedProposals}
            subtitle="Propostas rejeitadas"
            icon={<XCircle className="h-5 w-5" />}
            className="bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-950/20 dark:to-rose-950/20"
          />
          <MetricCard
            title="Pendentes"
            value={metrics.pendingProposals}
            subtitle="Aguardando ação"
            icon={<AlertCircle className="h-5 w-5" />}
            className="bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-950/20 dark:to-amber-950/20"
          />
        </div>
      </div>
    </div>
  );
};
