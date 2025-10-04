/**
 * Proposals API
 * Camada de comunicação com a API - apenas requisições HTTP
 */

import { api } from "@/api";
import type { Proposal } from "@/shared/types";

export const proposalsApi = {
  getAll: async (): Promise<Proposal[]> => {
    const response = await api.get<Proposal[]>("/proposals");
    return response.data;
  },

  getById: async (id: string): Promise<Proposal> => {
    const response = await api.get<Proposal>(`/proposals/${id}`);
    return response.data;
  },

  create: async (data: Partial<Proposal>): Promise<Proposal> => {
    const response = await api.post<Proposal>("/proposals", data);
    return response.data;
  },

  update: async (id: string, data: Partial<Proposal>): Promise<Proposal> => {
    const response = await api.patch<Proposal>(`/proposals/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/proposals/${id}`);
  },
};
