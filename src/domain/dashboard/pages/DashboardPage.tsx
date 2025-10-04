import { DashboardView } from "@/domain/dashboard/components/DashboardView";
import { Breadcrumb } from "@/shared/components";

export const DashboardPage = () => {
  return (
    <div className="container mx-auto py-8">
      <Breadcrumb />
      <DashboardView />
    </div>
  );
};
