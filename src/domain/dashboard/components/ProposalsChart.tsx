import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import {
  ChartContainer,
  ChartTooltipContent,
} from "@/shared/components/ui/chart";

interface ProposalsChartProps {
  data: Array<{
    month: string;
    total: number;
    approved: number;
    rejected: number;
  }>;
}

const chartConfig = {
  total: {
    label: "Total",
    color: "hsl(var(--primary))",
  },
  approved: {
    label: "Aprovadas",
    color: "#22c55e",
  },
  rejected: {
    label: "Rejeitadas",
    color: "#ef4444",
  },
};

export const ProposalsChart = ({ data }: ProposalsChartProps) => {
  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl">Propostas por Mês</CardTitle>
        <CardDescription>
          Acompanhe o volume de propostas ao longo do tempo
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="month"
                className="text-xs"
                tick={{ fill: "hsl(var(--muted-foreground))" }}
              />
              <YAxis
                className="text-xs"
                tick={{ fill: "hsl(var(--muted-foreground))" }}
              />
              <Tooltip content={<ChartTooltipContent />} />
              <Legend />
              <Bar
                dataKey="approved"
                fill={chartConfig.approved.color}
                name="Aprovadas"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="rejected"
                fill={chartConfig.rejected.color}
                name="Rejeitadas"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
