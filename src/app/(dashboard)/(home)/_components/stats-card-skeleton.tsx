import { Skeleton } from "@/components/ui/skeleton";
import { ANALYTICS_CARDS_SKELETON } from "@/constants/analytics";
import React from "react";

const StatsCardSkeleton = () => {
  return (
    <div className="grid gap-3 lg:gap-8 lg:grid-cols-3">
      {ANALYTICS_CARDS_SKELETON.map((_, index) => (
        <Skeleton key={index} className="w-full min-h-[120px]" />
      ))}
    </div>
  );
};

export default StatsCardSkeleton;
