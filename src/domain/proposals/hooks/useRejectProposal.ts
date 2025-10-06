import { useMutation, useQueryClient } from "@tanstack/react-query";
import { proposalsService } from "../services/proposalsService";
import { toast } from "sonner";

const PROPOSALS_QUERY_KEY = ["proposals"];
const DASHBOARD_QUERY_KEY = ["dashboard"];

export const useRejectProposal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => proposalsService.reject(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROPOSALS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: DASHBOARD_QUERY_KEY });
      toast.warning("Proposta rejeitada", {
        description: "A proposta foi rejeitada.",
      });
    },
    onError: (error: Error) => {
      toast.error("Erro ao rejeitar proposta", {
        description: error.message,
      });
    },
  });
};
