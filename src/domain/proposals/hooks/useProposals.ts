import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { proposalsService } from "../services/proposalsService";
import { toast } from "sonner";
import type { Proposal } from "@/shared/types";

const QUERY_KEY = ["proposals"];

export const useProposals = () => {
  const queryClient = useQueryClient();

  const {
    data: proposals = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: QUERY_KEY,
    queryFn: () => proposalsService.getAll(),
  });

  const createMutation = useMutation({
    mutationFn: (data: Partial<Proposal>) => proposalsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
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

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Proposal> }) =>
      proposalsService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
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

  const deleteMutation = useMutation({
    mutationFn: (id: string) => proposalsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
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

  const approveMutation = useMutation({
    mutationFn: (id: string) => proposalsService.approve(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      toast.success("Proposta aprovada!", {
        description: "A proposta foi aprovada com sucesso.",
      });
    },
    onError: (error: Error) => {
      toast.error("Erro ao aprovar proposta", {
        description: error.message,
      });
    },
  });

  const rejectMutation = useMutation({
    mutationFn: (id: string) => proposalsService.reject(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
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

  return {
    proposals,
    isLoading,
    error,
    createProposal: createMutation.mutateAsync,
    updateProposal: updateMutation.mutateAsync,
    deleteProposal: deleteMutation.mutateAsync,
    approveProposal: approveMutation.mutateAsync,
    rejectProposal: rejectMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
    isApproving: approveMutation.isPending,
    isRejecting: rejectMutation.isPending,
  };
};

export const useProposal = (id: string) => {
  const {
    data: proposal,
    isLoading,
    error,
  } = useQuery({
    queryKey: [...QUERY_KEY, id],
    queryFn: () => proposalsService.getById(id),
    enabled: !!id,
  });

  return { proposal, isLoading, error };
};
