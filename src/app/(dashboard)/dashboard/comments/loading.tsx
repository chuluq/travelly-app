import { DashboardShell } from "@/components/shell";
import { TableSkeleton } from "@/components/table-skeleton";

export default function DashboardCommentLoading() {
  return (
    <DashboardShell className="px-2">
      <TableSkeleton />
    </DashboardShell>
  );
}
