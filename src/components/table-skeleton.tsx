import { Skeleton } from "@/components/ui/skeleton";

export const TableSkeleton = () => {
  return (
    <div className="flex flex-col space-y-8 container mx-auto">
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-[150px] rounded-lg" />
        <Skeleton className="h-9 w-[100px] rounded-xl" />
      </div>
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-6 w-full rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
      </div>
    </div>
  );
};
