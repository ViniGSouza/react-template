import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "../services/dashboardService";

export const useDashboard = () => {
  const {
    data: metrics,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["dashboard", "metrics"],
    queryFn: () => dashboardService.getMetrics(),
    refetchInterval: 30000, 
  });

  return {
    metrics,
    isLoading,
    error,
  };
};
