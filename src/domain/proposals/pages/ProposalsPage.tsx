import { ProposalsList } from "@/domain/proposals/components/ProposalsList";
import { Breadcrumb } from "@/shared/components";

export const ProposalsPage = () => {
  return (
    <div className="container mx-auto py-4">
      <Breadcrumb />
      <ProposalsList />
    </div>
  );
};
