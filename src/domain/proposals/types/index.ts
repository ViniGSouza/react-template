import type { ProposalStatus } from "@/shared/types";

export type { Proposal, ProposalStatus } from "@/shared/types";

export interface CreateProposalData {
  customerName: string;
  customerEmail: string;
  product: string;
  value: number;
  description: string;
}

export interface UpdateProposalData extends Partial<CreateProposalData> {
  status?: ProposalStatus;
}
