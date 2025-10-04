import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import type { Proposal } from "@/shared/types";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { useUser } from "@/domain/auth/hooks/useAuth";

interface ProposalCardProps {
  proposal: Proposal;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  onDelete?: (id: string) => void;
  isLoading?: boolean;
}

const statusMap = {
  pending: { label: "Pendente", variant: "warning" as const },
  approved: { label: "Aprovada", variant: "success" as const },
  rejected: { label: "Rejeitada", variant: "destructive" as const },
  draft: { label: "Rascunho", variant: "secondary" as const },
};

export const ProposalCard = ({
  proposal,
  onApprove,
  onReject,
  onDelete,
  isLoading,
}: ProposalCardProps) => {
  const user = useUser();
  const isManager = user?.role === "manager";
  const isOwner = user?.id === proposal.createdBy;
  const isPending = proposal.status === "pending";

  return (
    <Card className="group relative overflow-hidden border-0 shadow-lg transition-all hover:shadow-xl hover:scale-[1.02]">
      {}
      <div className="absolute inset-0 bg-gradient-to-br via-transparent to-transparent opacity-0 transition-opacity pointer-events-none from-primary/5 group-hover:opacity-100" />

      <CardHeader className="relative">
        <div className="flex gap-3 justify-between items-start">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg truncate">
              {proposal.product}
            </CardTitle>
            <CardDescription className="truncate">
              {proposal.customerName}
            </CardDescription>
          </div>
          <Badge
            variant={statusMap[proposal.status].variant}
            className="shrink-0"
          >
            {statusMap[proposal.status].label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div>
          <p className="text-sm font-medium">Valor</p>
          <p className="text-2xl font-bold text-primary">
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(proposal.value)}
          </p>
        </div>
        <div>
          <p className="text-sm font-medium">Descrição</p>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {proposal.description}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 pt-2 text-xs text-muted-foreground">
          <div>
            <p className="font-medium">Criado por</p>
            <p>{proposal.createdByName}</p>
          </div>
          <div>
            <p className="font-medium">Data</p>
            <p>
              {format(new Date(proposal.createdAt), "dd/MM/yyyy HH:mm", {
                locale: ptBR,
              })}
            </p>
          </div>
        </div>
      </CardContent>
      {(isManager && isPending) || (isOwner && proposal.status === "draft") ? (
        <CardFooter className="flex gap-2">
          {isManager && isPending && (
            <>
              <Button
                size="sm"
                onClick={() => onApprove?.(proposal.id)}
                disabled={isLoading}
                className="flex-1"
              >
                Aprovar
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => onReject?.(proposal.id)}
                disabled={isLoading}
                className="flex-1"
              >
                Rejeitar
              </Button>
            </>
          )}
          {isOwner && proposal.status === "draft" && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => onDelete?.(proposal.id)}
              disabled={isLoading}
              className="flex-1"
            >
              Excluir
            </Button>
          )}
        </CardFooter>
      ) : null}
    </Card>
  );
};
