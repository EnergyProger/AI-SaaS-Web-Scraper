import { getCreditsUsageInPeriod } from "@/actions/analytics";
import { Period } from "@/types/analytics";
import React from "react";
import CreditUsageChart from "./credits-usage-chart";

type Props = {
  selectedPeriod: Period;
};

const CreditsUsageInPeriod = async ({ selectedPeriod }: Props) => {
  const data = await getCreditsUsageInPeriod(selectedPeriod);

  return (
    <CreditUsageChart
      data={data}
      title="Daily credits spent"
      description="Daily credit consumed in selected period"
    />
  );
};

export default CreditsUsageInPeriod;
