import { describe, it, expect, beforeEach } from "vitest";
import { proposalsService } from "../services/proposalsService";
import { storage } from "@/core/storage";
import type { Proposal } from "@/shared/types";

describe("Proposals Service", () => {
  beforeEach(() => {
    storage.clear();
  });

  describe("getAll", () => {
    it("deve retornar lista de propostas", async () => {
      const proposals = await proposalsService.getAll();

      expect(proposals).toBeInstanceOf(Array);
      expect(proposals.length).toBeGreaterThan(0);
      expect(proposals[0]).toHaveProperty("id");
      expect(proposals[0]).toHaveProperty("customerName");
      expect(proposals[0]).toHaveProperty("status");
    });
  });

  describe("getById", () => {
    it("deve retornar uma proposta específica", async () => {
      const proposals = await proposalsService.getAll();
      const firstProposal = proposals[0];

      const proposal = await proposalsService.getById(firstProposal.id);

      expect(proposal).toEqual(firstProposal);
    });

    it("deve lançar erro se proposta não existir", async () => {
      await expect(proposalsService.getById("invalid-id")).rejects.toThrow(
        "Proposta não encontrada"
      );
    });
  });

  describe("create", () => {
    it("deve criar nova proposta", async () => {
      const newProposalData: Partial<Proposal> = {
        customerName: "Cliente Teste",
        customerEmail: "teste@example.com",
        product: "Produto Teste",
        value: 10000,
        description: "Descrição de teste",
      };

      const proposal = await proposalsService.create(newProposalData);

      expect(proposal).toHaveProperty("id");
      expect(proposal.customerName).toBe(newProposalData.customerName);
      expect(proposal.status).toBe("pending");
      expect(proposal).toHaveProperty("createdAt");
    });

    it("deve adicionar informações do usuário atual na criação", async () => {
      storage.set("user", { id: "1", name: "Vendedor Teste" });

      const newProposalData: Partial<Proposal> = {
        customerName: "Cliente Teste",
        customerEmail: "teste@example.com",
        product: "Produto Teste",
        value: 10000,
        description: "Descrição de teste",
      };

      const proposal = await proposalsService.create(newProposalData);

      expect(proposal.createdBy).toBe("1");
      expect(proposal.createdByName).toBe("Vendedor Teste");
    });
  });

  describe("update", () => {
    it("deve atualizar proposta existente", async () => {
      const proposals = await proposalsService.getAll();
      const proposalToUpdate = proposals[0];

      const updated = await proposalsService.update(proposalToUpdate.id, {
        customerName: "Nome Atualizado",
      });

      expect(updated.customerName).toBe("Nome Atualizado");
      expect(updated.id).toBe(proposalToUpdate.id);
      expect(updated).toHaveProperty("updatedAt");
    });

    it("deve adicionar informações de aprovador ao mudar status", async () => {
      const proposals = await proposalsService.getAll();
      const proposalToUpdate = proposals.find((p) => p.status === "pending");

      if (!proposalToUpdate) {
        throw new Error("Nenhuma proposta pendente encontrada");
      }

      storage.set("user", { id: "2", name: "Gerente Teste" });

      const updated = await proposalsService.update(proposalToUpdate.id, {
        status: "approved",
      });

      expect(updated.status).toBe("approved");
      expect(updated.approvedBy).toBe("2");
      expect(updated.approvedByName).toBe("Gerente Teste");
    });

    it("deve lançar erro se proposta não existir", async () => {
      await expect(
        proposalsService.update("invalid-id", { customerName: "Test" })
      ).rejects.toThrow("Proposta não encontrada");
    });
  });

  describe("delete", () => {
    it("deve deletar proposta existente", async () => {
      const proposals = await proposalsService.getAll();
      const proposalToDelete = proposals[0];

      await proposalsService.delete(proposalToDelete.id);

      await expect(
        proposalsService.getById(proposalToDelete.id)
      ).rejects.toThrow("Proposta não encontrada");
    });

    it("deve lançar erro se proposta não existir", async () => {
      await expect(proposalsService.delete("invalid-id")).rejects.toThrow(
        "Proposta não encontrada"
      );
    });
  });

  describe("approve", () => {
    it("deve aprovar proposta", async () => {
      const proposals = await proposalsService.getAll();
      const pendingProposal = proposals.find((p) => p.status === "pending");

      if (!pendingProposal) {
        throw new Error("Nenhuma proposta pendente encontrada");
      }

      const approved = await proposalsService.approve(pendingProposal.id);

      expect(approved.status).toBe("approved");
    });
  });

  describe("reject", () => {
    it("deve rejeitar proposta", async () => {
      const proposals = await proposalsService.getAll();
      const pendingProposal = proposals.find((p) => p.status === "pending");

      if (!pendingProposal) {
        throw new Error("Nenhuma proposta pendente encontrada");
      }

      const rejected = await proposalsService.reject(pendingProposal.id);

      expect(rejected.status).toBe("rejected");
    });
  });
});
