import { useParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  ArrowLeft,
  User,
  Calendar,
  Mail,
  FileText,
  DollarSign,
} from "lucide-react";
import {
  useProposalDetail,
  useApproveProposal,
  useRejectProposal,
} from "../hooks";
import { Breadcrumb } from "@/shared/components";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { useAuthUser } from "@/domain/auth/hooks";

const statusMap = {
  pending: { label: "Pendente", variant: "warning" as const },
  approved: { label: "Aprovada", variant: "success" as const },
  rejected: { label: "Rejeitada", variant: "destructive" as const },
  draft: { label: "Rascunho", variant: "secondary" as const },
};

export const ProposalDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: user } = useAuthUser();

  // Query hook
  const { data: proposal, isLoading } = useProposalDetail(id!);

  // Mutation hooks - apenas instancia os que usa
  const { mutateAsync: approveProposal, isPending: isApproving } =
    useApproveProposal();
  const { mutateAsync: rejectProposal, isPending: isRejecting } =
    useRejectProposal();

  const isManager = user?.role === "manager";
  const isPending = proposal?.status === "pending";

  const handleApprove = async () => {
    try {
      await approveProposal(id!);
    } catch (error) {
      console.error("Erro ao aprovar proposta:", error);
    }
  };

  const handleReject = async () => {
    try {
      await rejectProposal(id!);
    } catch (error) {
      console.error("Erro ao rejeitar proposta:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-4">
        <div className="flex h-64 items-center justify-center">
          <p className="text-muted-foreground">Carregando proposta...</p>
        </div>
      </div>
    );
  }

  if (!proposal) {
    return (
      <div className="container mx-auto py-4">
        <div className="flex h-64 items-center justify-center flex-col gap-4">
          <p className="text-muted-foreground">Proposta não encontrada</p>
          <Button onClick={() => navigate("/proposals")} variant="outline">
            Voltar para lista
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-4 animate-in fade-in duration-500">
      <Breadcrumb />

      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => navigate("/proposals")}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar para lista
        </Button>

        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-2">
              {proposal.product}
            </h1>
            <p className="text-muted-foreground">
              Proposta #{proposal.id.slice(0, 8)}
            </p>
          </div>
          <Badge
            variant={statusMap[proposal.status].variant}
            className="text-base px-4 py-2"
          >
            {statusMap[proposal.status].label}
          </Badge>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Informações do Cliente
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Nome</p>
              <p className="text-lg font-semibold">{proposal.customerName}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Mail className="w-4 h-4" />
                E-mail
              </p>
              <p className="text-lg">{proposal.customerEmail}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Detalhes da Proposta
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Produto
              </p>
              <p className="text-lg font-semibold">{proposal.product}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Valor
              </p>
              <p className="text-3xl font-bold text-primary">
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(proposal.value)}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Descrição</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground whitespace-pre-wrap">
              {proposal.description}
            </p>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Histórico
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Criado por
                </p>
                <p className="text-lg font-semibold">
                  {proposal.createdByName}
                </p>
                <p className="text-sm text-muted-foreground">
                  {format(
                    new Date(proposal.createdAt),
                    "dd/MM/yyyy 'às' HH:mm",
                    {
                      locale: ptBR,
                    }
                  )}
                </p>
              </div>

              {proposal.approvedBy && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {proposal.status === "approved"
                      ? "Aprovado por"
                      : "Rejeitado por"}
                  </p>
                  <p className="text-lg font-semibold">
                    {proposal.approvedByName}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {format(
                      new Date(proposal.updatedAt),
                      "dd/MM/yyyy 'às' HH:mm",
                      {
                        locale: ptBR,
                      }
                    )}
                  </p>
                </div>
              )}

              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Última atualização
                </p>
                <p className="text-sm text-muted-foreground">
                  {format(
                    new Date(proposal.updatedAt),
                    "dd/MM/yyyy 'às' HH:mm",
                    {
                      locale: ptBR,
                    }
                  )}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {isManager && isPending && (
        <Card className="mt-6 border-primary/20">
          <CardHeader>
            <CardTitle>Ações do Gerente</CardTitle>
            <CardDescription>Aprove ou rejeite esta proposta</CardDescription>
          </CardHeader>
          <CardContent className="flex gap-4">
            <Button
              onClick={handleApprove}
              disabled={isApproving || isRejecting}
              className="flex-1"
              size="lg"
            >
              {isApproving ? "Aprovando..." : "Aprovar Proposta"}
            </Button>
            <Button
              onClick={handleReject}
              disabled={isApproving || isRejecting}
              variant="destructive"
              className="flex-1"
              size="lg"
            >
              {isRejecting ? "Rejeitando..." : "Rejeitar Proposta"}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
