import { useQuery } from "@tanstack/react-query";
import { proposalsService } from "../services/proposalsService";
import type { Proposal } from "../types";

const PROPOSALS_LIST_KEY = ["proposals", "list"];

export const useProposalsList = () => {
  return useQuery<Proposal[], Error>({
    queryKey: PROPOSALS_LIST_KEY,
    queryFn: () => proposalsService.getAll(),
  });
};
