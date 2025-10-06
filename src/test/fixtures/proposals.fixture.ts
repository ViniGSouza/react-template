import type { Proposal } from "@/domain/proposals/types";

export const mockProposals: Proposal[] = [
  {
    id: "1",
    customerName: "João Silva",
    customerEmail: "joao.silva@example.com",
    product: "Sistema ERP Enterprise",
    value: 150000,
    description:
      "Implementação completa de sistema ERP para gestão empresarial com módulos de vendas, estoque, financeiro e RH",
    status: "pending",
    createdBy: "1",
    createdByName: "João Vendedor",
    createdAt: "2025-10-01T10:00:00Z",
    updatedAt: "2025-10-01T10:00:00Z",
  },
  {
    id: "2",
    customerName: "Maria Santos",
    customerEmail: "maria.santos@example.com",
    product: "Consultoria em Cloud Computing",
    value: 85000,
    description:
      "Consultoria especializada para migração de infraestrutura para nuvem AWS com otimização de custos",
    status: "approved",
    createdBy: "1",
    createdByName: "João Vendedor",
    approvedBy: "2",
    approvedByName: "Maria Gerente",
    createdAt: "2025-09-28T14:30:00Z",
    updatedAt: "2025-09-29T09:15:00Z",
  },
  {
    id: "3",
    customerName: "Pedro Oliveira",
    customerEmail: "pedro.oliveira@example.com",
    product: "Desenvolvimento de App Mobile",
    value: 120000,
    description:
      "Desenvolvimento de aplicativo mobile nativo para iOS e Android com integração a sistemas legados",
    status: "rejected",
    createdBy: "1",
    createdByName: "João Vendedor",
    approvedBy: "2",
    approvedByName: "Maria Gerente",
    createdAt: "2025-09-25T11:20:00Z",
    updatedAt: "2025-09-26T16:45:00Z",
  },
  {
    id: "4",
    customerName: "Ana Costa",
    customerEmail: "ana.costa@example.com",
    product: "Plataforma E-commerce",
    value: 95000,
    description:
      "Desenvolvimento de plataforma e-commerce completa com integração a gateways de pagamento e marketplaces",
    status: "pending",
    createdBy: "1",
    createdByName: "João Vendedor",
    createdAt: "2025-10-02T08:45:00Z",
    updatedAt: "2025-10-02T08:45:00Z",
  },
  {
    id: "5",
    customerName: "Carlos Mendes",
    customerEmail: "carlos.mendes@example.com",
    product: "Auditoria de Segurança",
    value: 45000,
    description:
      "Auditoria completa de segurança da informação com testes de penetração e análise de vulnerabilidades",
    status: "approved",
    createdBy: "1",
    createdByName: "João Vendedor",
    approvedBy: "2",
    approvedByName: "Maria Gerente",
    createdAt: "2025-09-20T13:00:00Z",
    updatedAt: "2025-09-21T10:30:00Z",
  },
];

export const generateMockProposal = (
  overrides?: Partial<Proposal>
): Proposal => ({
  id: Math.random().toString(36).substring(7),
  customerName: "Cliente Teste",
  customerEmail: "cliente@teste.com",
  product: "Produto Teste",
  value: 10000,
  description: "Descrição de teste para a proposta",
  status: "draft",
  createdBy: "1",
  createdByName: "João Vendedor",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  ...overrides,
});
