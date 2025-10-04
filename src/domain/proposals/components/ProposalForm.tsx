import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  proposalSchema,
  type ProposalFormData,
} from "../schemas/proposal.schema";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";

interface ProposalFormProps {
  onSubmit: (data: ProposalFormData) => Promise<void>;
  defaultValues?: Partial<ProposalFormData>;
  isSubmitting?: boolean;
}

export const ProposalForm = ({
  onSubmit,
  defaultValues,
  isSubmitting,
}: ProposalFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProposalFormData>({
    resolver: zodResolver(proposalSchema),
    defaultValues: defaultValues
      ? {
          customerName: defaultValues.customerName,
          customerEmail: defaultValues.customerEmail,
          product: defaultValues.product,
          value: defaultValues.value,
          description: defaultValues.description,
        }
      : undefined,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="customerName">Nome do Cliente</Label>
        <Input
          id="customerName"
          placeholder="Ex: João Silva"
          {...register("customerName")}
          disabled={isSubmitting}
        />
        {errors.customerName && (
          <p className="text-sm text-destructive">
            {errors.customerName.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="customerEmail">E-mail do Cliente</Label>
        <Input
          id="customerEmail"
          type="email"
          placeholder="Ex: cliente@empresa.com"
          {...register("customerEmail")}
          disabled={isSubmitting}
        />
        {errors.customerEmail && (
          <p className="text-sm text-destructive">
            {errors.customerEmail.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="product">Produto/Serviço</Label>
        <Input
          id="product"
          placeholder="Ex: Sistema ERP Enterprise"
          {...register("product")}
          disabled={isSubmitting}
        />
        {errors.product && (
          <p className="text-sm text-destructive">{errors.product.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="value">Valor (R$)</Label>
        <Input
          id="value"
          type="number"
          step="0.01"
          placeholder="Ex: 150000.00"
          {...register("value", { valueAsNumber: true })}
          disabled={isSubmitting}
        />
        {errors.value && (
          <p className="text-sm text-destructive">{errors.value.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descrição</Label>
        <textarea
          id="description"
          rows={4}
          className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Descreva os detalhes da proposta..."
          {...register("description")}
          disabled={isSubmitting}
        />
        {errors.description && (
          <p className="text-sm text-destructive">
            {errors.description.message}
          </p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Salvando..." : "Salvar Proposta"}
      </Button>
    </form>
  );
};
