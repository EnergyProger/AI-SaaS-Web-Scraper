import { getPeriods } from "@/actions/analytics";
import React from "react";
import PeriodSelector from "./period-selector";
import { Period } from "@/types/analytics";

type Props = {
  selectedPeriod: Period;
};

const PeriodSelectorWrapper = async ({ selectedPeriod }: Props) => {
  const periods = await getPeriods();

  return <PeriodSelector periods={periods} selectedPeriod={selectedPeriod} />;
};

export default PeriodSelectorWrapper;
