import React, { Suspense } from "react";
import PeriodSelectorWrapper from "./_components/period-selector-wrapper";
import { Period } from "@/types/analytics";
import { Skeleton } from "@/components/ui/skeleton";
import StatsCards from "./_components/stats-cards";
import StatsCardSkeleton from "./_components/stats-card-skeleton";
import StatsExecutionStatus from "./_components/stats-execution-status";
import CreditsUsageInPeriod from "../billing/_components/credits-usage-in-period";

type Props = {
  searchParams: {
    month?: string;
    year?: string;
  };
};

const HomePage = ({ searchParams }: Props) => {
  const currentDate = new Date();
  const { month, year } = searchParams;
  const period: Period = {
    month: month ? parseInt(month) : currentDate.getMonth(),
    year: year ? parseInt(year) : currentDate.getFullYear(),
  };

  return (
    <div className="flex flex-1 flex-col h-full">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">Home</h1>
        <Suspense fallback={<Skeleton className="h-[40px] w-[180px]" />}>
          <PeriodSelectorWrapper selectedPeriod={period} />
        </Suspense>
      </div>
      <div className="h-full py-6 flex flex-col gap-4">
        <Suspense fallback={<StatsCardSkeleton />}>
          <StatsCards selectedPeriod={period} />
        </Suspense>
        <Suspense fallback={<Skeleton className="w-full h-[300px]" />}>
          <StatsExecutionStatus selectedPeriod={period} />
        </Suspense>
        <Suspense fallback={<Skeleton className="w-full h-[300px]" />}>
          <CreditsUsageInPeriod selectedPeriod={period} />
        </Suspense>
      </div>
    </div>
  );
};

export default HomePage;
