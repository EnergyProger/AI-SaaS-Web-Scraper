"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MONTH_NAMES } from "@/constants/common";
import { Period } from "@/types/analytics";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import {
  ReadonlyURLSearchParams,
  useRouter,
  useSearchParams,
} from "next/navigation";
import React from "react";

type Props = {
  periods: Period[];
  selectedPeriod: Period;
};

const PeriodSelector = ({ periods, selectedPeriod }: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const onValueChange = (
    value: string,
    searchParams: ReadonlyURLSearchParams,
    router: AppRouterInstance
  ) => {
    const [month, year] = value.split("-");
    const params = new URLSearchParams(searchParams);
    params.set("month", month);
    params.set("year", year);
    router.push(`?${params.toString()}`);
  };

  return (
    <Select
      value={`${selectedPeriod.month}-${selectedPeriod.year}`}
      onValueChange={(value) => onValueChange(value, searchParams, router)}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {periods.map((period, index) => (
          <SelectItem key={index} value={`${period.month}-${period.year}`}>
            {`${MONTH_NAMES[period.month]} ${period.year}`}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default PeriodSelector;
