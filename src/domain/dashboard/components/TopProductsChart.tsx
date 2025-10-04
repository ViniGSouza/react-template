import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
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

interface TopProductsChartProps {
  data: Array<{
    name: string;
    count: number;
    value: number;
  }>;
}

const chartConfig = {
  value: {
    label: "Valor Total",
    color: "hsl(var(--primary))",
  },
};

export const TopProductsChart = ({ data }: TopProductsChartProps) => {
  const formattedData = data.map((item) => ({
    ...item,
    
    productShort:
      item.name.length > 25 ? `${item.name.substring(0, 25)}...` : item.name,
  }));

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl">Top Produtos/Serviços</CardTitle>
        <CardDescription>
          Produtos com maior valor em propostas aprovadas
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={formattedData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                type="number"
                className="text-xs"
                tick={{ fill: "hsl(var(--muted-foreground))" }}
                tickFormatter={(value) =>
                  new Intl.NumberFormat("pt-BR", {
                    notation: "compact",
                    compactDisplay: "short",
                  }).format(value)
                }
              />
              <YAxis
                dataKey="productShort"
                type="category"
                className="text-xs"
                tick={{ fill: "hsl(var(--muted-foreground))" }}
                width={150}
              />
              <Tooltip
                content={<ChartTooltipContent />}
                formatter={(value: number) =>
                  new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(value)
                }
              />
              <Bar
                dataKey="value"
                fill={chartConfig.value.color}
                name="Valor"
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
