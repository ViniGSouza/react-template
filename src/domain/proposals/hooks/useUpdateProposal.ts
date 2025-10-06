import { useMutation, useQueryClient } from "@tanstack/react-query";
import { proposalsService } from "../services/proposalsService";
import { toast } from "sonner";
import type { Proposal } from "../types";

const PROPOSALS_QUERY_KEY = ["proposals"];

export const useUpdateProposal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Proposal> }) =>
      proposalsService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROPOSALS_QUERY_KEY });
      toast.info("Proposta atualizada", {
        description: "As alterações foram salvas com sucesso.",
      });
    },
    onError: (error: Error) => {
      toast.error("Erro ao atualizar proposta", {
        description: error.message,
      });
    },
  });
};
