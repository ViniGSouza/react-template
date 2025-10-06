import { proposalsApi } from "../api/proposalsApi";
import { storage } from "@/core/storage";
import type { Proposal } from "../types";
import {
  mockProposals,
  generateMockProposal,
} from "@/test/fixtures/proposals.fixture";
import type { CreateProposalData } from "../types";

const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";
const STORAGE_KEY = "proposals";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const getStoredProposals = (): Proposal[] => {
  const stored = storage.get<Proposal[]>(STORAGE_KEY);
  if (!stored) {
    storage.set(STORAGE_KEY, mockProposals);
    return mockProposals;
  }
  return stored;
};

const saveProposals = (proposals: Proposal[]): void => {
  storage.set(STORAGE_KEY, proposals);
};

const mockGetAll = async (): Promise<Proposal[]> => {
  await delay(500);
  return getStoredProposals();
};

const mockGetById = async (id: string): Promise<Proposal> => {
  await delay(300);
  const proposals = getStoredProposals();
  const proposal = proposals.find((p) => p.id === id);

  if (!proposal) {
    throw new Error("Proposta não encontrada");
  }

  return proposal;
};

const mockCreate = async (data: Partial<Proposal>): Promise<Proposal> => {
  await delay(600);

  const user = storage.get<{ id: string; name: string }>("user");
  const proposals = getStoredProposals();

  const newProposal = generateMockProposal({
    ...(data as CreateProposalData),
    status: "pending",
    createdBy: user?.id || "1",
    createdByName: user?.name || "Usuário",
  });

  const updated = [newProposal, ...proposals];
  saveProposals(updated);

  return newProposal;
};

const mockUpdate = async (
  id: string,
  data: Partial<Proposal>
): Promise<Proposal> => {
  await delay(500);

  const proposals = getStoredProposals();
  const index = proposals.findIndex((p) => p.id === id);

  if (index === -1) {
    throw new Error("Proposta não encontrada");
  }

  const user = storage.get<{ id: string; name: string }>("user");
  const updatedProposal: Proposal = {
    ...proposals[index],
    ...data,
    updatedAt: new Date().toISOString(),
    ...(data.status && data.status !== proposals[index].status
      ? {
          approvedBy: user?.id,
          approvedByName: user?.name,
        }
      : {}),
  };

  proposals[index] = updatedProposal;
  saveProposals(proposals);

  return updatedProposal;
};

const mockDelete = async (id: string): Promise<void> => {
  await delay(400);

  const proposals = getStoredProposals();
  const filtered = proposals.filter((p) => p.id !== id);

  if (filtered.length === proposals.length) {
    throw new Error("Proposta não encontrada");
  }

  saveProposals(filtered);
};

export const proposalsService = {
  getAll: async (): Promise<Proposal[]> => {
    return USE_MOCK ? await mockGetAll() : await proposalsApi.getAll();
  },

  getById: async (id: string): Promise<Proposal> => {
    return USE_MOCK ? await mockGetById(id) : await proposalsApi.getById(id);
  },

  create: async (data: Partial<Proposal>): Promise<Proposal> => {
    return USE_MOCK ? await mockCreate(data) : await proposalsApi.create(data);
  },

  update: async (id: string, data: Partial<Proposal>): Promise<Proposal> => {
    return USE_MOCK
      ? await mockUpdate(id, data)
      : await proposalsApi.update(id, data);
  },

  delete: async (id: string): Promise<void> => {
    return USE_MOCK ? await mockDelete(id) : await proposalsApi.delete(id);
  },

  approve: async (id: string): Promise<Proposal> => {
    return proposalsService.update(id, { status: "approved" });
  },

  reject: async (id: string): Promise<Proposal> => {
    return proposalsService.update(id, { status: "rejected" });
  },
};
