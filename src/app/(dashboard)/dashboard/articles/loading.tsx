import { DashboardShell } from "@/components/shell";
import { TableSkeleton } from "@/components/table-skeleton";

export default function DashboardArticleLoading() {
  return (
    <DashboardShell className="px-2">
      <TableSkeleton />
    </DashboardShell>
  );
}
