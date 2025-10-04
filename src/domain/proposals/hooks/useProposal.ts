import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { proposalsService } from "../services/proposalsService";
import { toast } from "sonner";

export const useProposal = (id: string) => {
  const queryClient = useQueryClient();

  const {
    data: proposal,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["proposal", id],
    queryFn: () => proposalsService.getById(id),
    enabled: !!id,
  });

  const approveMutation = useMutation({
    mutationFn: (proposalId: string) => proposalsService.approve(proposalId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["proposal", id] });
      queryClient.invalidateQueries({ queryKey: ["proposals"] });
      toast.success("Proposta aprovada com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao aprovar proposta");
    },
  });

  const rejectMutation = useMutation({
    mutationFn: (proposalId: string) => proposalsService.reject(proposalId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["proposal", id] });
      queryClient.invalidateQueries({ queryKey: ["proposals"] });
      toast.success("Proposta rejeitada");
    },
    onError: () => {
      toast.error("Erro ao rejeitar proposta");
    },
  });

  return {
    proposal,
    isLoading,
    error,
    approveProposal: approveMutation.mutateAsync,
    rejectProposal: rejectMutation.mutateAsync,
    isApproving: approveMutation.isPending,
    isRejecting: rejectMutation.isPending,
  };
};
