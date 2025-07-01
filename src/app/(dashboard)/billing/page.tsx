import React, { Suspense } from "react";
import BalanceCard from "./_components/balance-card";
import { Skeleton } from "@/components/ui/skeleton";
import CreditsPurchase from "./_components/credits-purchase";
import CreditUsageCard from "./_components/credit-usage-card";
import TransactionHistoryCard from "./_components/transaction-history-card";

const BillingPage = () => {
  return (
    <div className="mx-auto p-4 space-y-8">
      <h1 className="text-3xl font-bold">Billing</h1>
      <Suspense fallback={<Skeleton className="h-[160px] w-full" />}>
        <BalanceCard />
      </Suspense>
      <CreditsPurchase />
      <Suspense fallback={<Skeleton className="h-[300px] w-full" />}>
        <CreditUsageCard />
      </Suspense>
      <Suspense fallback={<Skeleton className="h-[300px] w-full" />}>
        <TransactionHistoryCard />
      </Suspense>
    </div>
  );
};

export default BillingPage;
