/**
 * Chart Components
 * Componentes base para charts usando Recharts com estilização Shadcn
 */

import * as React from "react";
import { cn } from "@/lib/utils";

interface ChartConfig {
  [key: string]: {
    label: string;
    color?: string;
  };
}

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    config: ChartConfig;
  }
>(({ className, children, config, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("w-full", className)}
      style={
        {
          "--color-primary": "hsl(var(--primary))",
          "--color-secondary": "hsl(var(--secondary))",
          "--color-muted": "hsl(var(--muted))",
          ...Object.entries(config).reduce((acc, [key, value]) => {
            if (value.color) {
              acc[`--color-${key}`] = value.color;
            }
            return acc;
          }, {} as Record<string, string>),
        } as React.CSSProperties
      }
      {...props}
    >
      {children}
    </div>
  );
});
ChartContainer.displayName = "ChartContainer";

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    active?: boolean;
    payload?: Array<{
      name: string;
      value: number;
      color: string;
    }>;
    label?: string;
  }
>(({ className, active, payload, label }, ref) => {
  if (!active || !payload) return null;

  return (
    <div
      ref={ref}
      className={cn("rounded-lg border bg-background p-2 shadow-md", className)}
    >
      {label && <div className="mb-1 font-medium">{label}</div>}
      <div className="grid gap-1">
        {payload.map((item, index) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-muted-foreground">{item.name}:</span>
            <span className="font-medium">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
});
ChartTooltipContent.displayName = "ChartTooltipContent";

export { ChartContainer, ChartTooltipContent };
export type { ChartConfig };
