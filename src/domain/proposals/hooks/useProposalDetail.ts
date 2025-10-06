import { useQuery } from "@tanstack/react-query";
import { proposalsService } from "../services/proposalsService";
import type { Proposal } from "../types";

const getProposalDetailKey = (id: string) => ["proposals", "detail", id];

export const useProposalDetail = (id: string) => {
  return useQuery<Proposal, Error>({
    queryKey: getProposalDetailKey(id),
    queryFn: () => proposalsService.getById(id),
    enabled: !!id,
  });
};
