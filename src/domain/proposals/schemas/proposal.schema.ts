import { z } from "zod";

export const proposalSchema = z.object({
  customerName: z
    .string()
    .min(3, "Nome deve ter no mínimo 3 caracteres")
    .max(100, "Nome deve ter no máximo 100 caracteres"),
  customerEmail: z
    .string()
    .min(1, "E-mail é obrigatório")
    .email("E-mail inválido"),
  product: z
    .string()
    .min(3, "Produto deve ter no mínimo 3 caracteres")
    .max(200, "Produto deve ter no máximo 200 caracteres"),
  value: z.number().min(0.01, "Valor deve ser maior que zero"),
  description: z
    .string()
    .min(10, "Descrição deve ter no mínimo 10 caracteres")
    .max(1000, "Descrição deve ter no máximo 1000 caracteres"),
});

export type ProposalFormData = z.infer<typeof proposalSchema>;
