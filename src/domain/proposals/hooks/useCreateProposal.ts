import { useMutation, useQueryClient } from "@tanstack/react-query";
import { proposalsService } from "../services/proposalsService";
import { toast } from "sonner";
import type { Proposal } from "../types";

const PROPOSALS_QUERY_KEY = ["proposals"];

export const useCreateProposal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<Proposal>) => proposalsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROPOSALS_QUERY_KEY });
      toast.success("Proposta criada!", {
        description:
          "Sua proposta foi criada com sucesso e está aguardando aprovação.",
      });
    },
    onError: (error: Error) => {
      toast.error("Erro ao criar proposta", {
        description: error.message || "Ocorreu um erro ao criar a proposta.",
      });
    },
  });
};
