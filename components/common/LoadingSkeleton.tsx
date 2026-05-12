import React from "react";
import { Skeleton } from "@/components/ui/Skeleton";

export function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="flex flex-col space-y-4 rounded-xl border p-4 shadow-sm">
          <Skeleton className="aspect-square w-full rounded-lg" />
          <div className="space-y-2">
            <Skeleton className="h-5 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
          </div>
          <div className="flex items-center justify-between pt-4">
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}
