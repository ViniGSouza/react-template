import type { CreateProposalData } from "./CreateProposalData";
import type { ProposalStatus } from "./ProposalStatus";

export interface UpdateProposalData extends Partial<CreateProposalData> {
  status?: ProposalStatus;
}
