"use client";

import { getAvailableCredits } from "@/actions/billing";
import {
  DEFAULT_ICON_SIZE,
  USER_BALANCE_REFETCH_INTERVAL,
} from "@/constants/constants";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Coins, Loader2 } from "lucide-react";
import Link from "next/link";
import React from "react";
import ReactCountUpWrapper from "./react-count-up-wrapper";
import { buttonVariants } from "./ui/button";

const UserAvailableCreditsBadge = () => {
  const query = useQuery({
    queryKey: ["user-available-credits"],
    queryFn: () => getAvailableCredits(),
    refetchInterval: USER_BALANCE_REFETCH_INTERVAL,
  });

  return (
    <Link
      href="/billing"
      className={cn(
        "w-full space-x-2 items-center",
        buttonVariants({ variant: "outline" })
      )}
    >
      <Coins size={DEFAULT_ICON_SIZE} className="text-primary" />
      <span className="font-semibold capitalize">
        {query.isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
        {!query.isLoading && query.data && (
          <ReactCountUpWrapper value={query.data} />
        )}
        {!query.isLoading && query.data === undefined && "-"}
      </span>
    </Link>
  );
};

export default UserAvailableCreditsBadge;
