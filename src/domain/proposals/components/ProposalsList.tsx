import { useState } from "react";
import { ProposalCard } from "./ProposalCard";
import {
  useProposalsList,
  useCreateProposal,
  useApproveProposal,
  useRejectProposal,
  useDeleteProposal,
} from "../hooks";
import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/shared/components/ui/dialog";
import { ProposalForm } from "./ProposalForm";
import type { ProposalFormData } from "../schemas/proposal.schema";

export const ProposalsList = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Query hooks
  const { data: proposals = [], isLoading } = useProposalsList();

  // Mutation hooks - apenas instancia os que usa
  const { mutateAsync: createProposal, isPending: isCreating } =
    useCreateProposal();
  const { mutateAsync: approveProposal, isPending: isApproving } =
    useApproveProposal();
  const { mutateAsync: rejectProposal, isPending: isRejecting } =
    useRejectProposal();
  const { mutateAsync: deleteProposal, isPending: isDeleting } =
    useDeleteProposal();

  const handleCreate = async (data: ProposalFormData) => {
    try {
      await createProposal(data);
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error("Erro ao criar proposta:", error);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      await approveProposal(id);
    } catch (error) {
      console.error("Erro ao aprovar proposta:", error);
    }
  };

  const handleReject = async (id: string) => {
    try {
      await rejectProposal(id);
    } catch (error) {
      console.error("Erro ao rejeitar proposta:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir esta proposta?")) return;

    try {
      await deleteProposal(id);
    } catch (error) {
      console.error("Erro ao excluir proposta:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-muted-foreground">Carregando propostas...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Propostas</h2>
          <p className="text-muted-foreground">
            Gerencie e acompanhe suas propostas
          </p>
        </div>
        <Button
          onClick={() => setIsCreateModalOpen(true)}
          className="shadow-lg shadow-primary/25"
        >
          Nova Proposta
        </Button>
      </div>

      {proposals.length === 0 ? (
        <div className="flex h-64 items-center justify-center rounded-lg border border-dashed">
          <div className="text-center">
            <p className="text-muted-foreground">Nenhuma proposta encontrada</p>
            <Button
              variant="link"
              onClick={() => setIsCreateModalOpen(true)}
              className="mt-2"
            >
              Criar primeira proposta
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {proposals.map((proposal) => (
            <ProposalCard
              key={proposal.id}
              proposal={proposal}
              onApprove={handleApprove}
              onReject={handleReject}
              onDelete={handleDelete}
              isLoading={isApproving || isRejecting || isDeleting}
            />
          ))}
        </div>
      )}

      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nova Proposta</DialogTitle>
            <DialogDescription>
              Preencha os dados para criar uma nova proposta
            </DialogDescription>
          </DialogHeader>
          <ProposalForm onSubmit={handleCreate} isSubmitting={isCreating} />
        </DialogContent>
      </Dialog>
    </div>
  );
};
