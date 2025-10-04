/**
 * useProposals Hook
 * Hook customizado para gerenciar propostas com TanStack Query
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { proposalsService } from "../services/proposalsService";
import { useNotificationsStore } from "@/core";
import type { Proposal } from "@/shared/types";

const QUERY_KEY = ["proposals"];

export const useProposals = () => {
  const queryClient = useQueryClient();
  const addNotification = useNotificationsStore(
    (state) => state.addNotification
  );

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
      addNotification({
        type: "success",
        title: "Proposta criada!",
        message:
          "Sua proposta foi criada com sucesso e está aguardando aprovação.",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Proposal> }) =>
      proposalsService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      addNotification({
        type: "info",
        title: "Proposta atualizada",
        message: "As alterações foram salvas com sucesso.",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => proposalsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      addNotification({
        type: "info",
        title: "Proposta excluída",
        message: "A proposta foi removida com sucesso.",
      });
    },
  });

  const approveMutation = useMutation({
    mutationFn: (id: string) => proposalsService.approve(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      addNotification({
        type: "success",
        title: "Proposta aprovada!",
        message: "A proposta foi aprovada com sucesso.",
      });
    },
  });

  const rejectMutation = useMutation({
    mutationFn: (id: string) => proposalsService.reject(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      addNotification({
        type: "warning",
        title: "Proposta rejeitada",
        message: "A proposta foi rejeitada.",
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
