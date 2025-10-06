import { useMutation, useQueryClient } from "@tanstack/react-query";
import { proposalsService } from "../services/proposalsService";
import { toast } from "sonner";

const PROPOSALS_QUERY_KEY = ["proposals"];

export const useDeleteProposal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => proposalsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROPOSALS_QUERY_KEY });
      toast.success("Proposta excluída", {
        description: "A proposta foi removida com sucesso.",
      });
    },
    onError: (error: Error) => {
      toast.error("Erro ao excluir proposta", {
        description: error.message,
      });
    },
  });
};
