import { getCreditsUsageInPeriod } from "@/actions/analytics";
import { Period } from "@/types/analytics";
import React from "react";
import CreditUsageChart from "./credits-usage-chart";

const CreditUsageCard = async () => {
  const period: Period = {
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  };

  const data = await getCreditsUsageInPeriod(period);

  return (
    <CreditUsageChart
      data={data}
      title="Credits consumed"
      description="Daily credits consumed in the current month"
    />
  );
};

export default CreditUsageCard;
