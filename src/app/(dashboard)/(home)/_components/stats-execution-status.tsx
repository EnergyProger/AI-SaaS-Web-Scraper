import { getWorkflowExecutionStats } from "@/actions/analytics";
import { Period } from "@/types/analytics";
import React from "react";
import ExecutionStatusChart from "./execution-status-chart";

type Props = {
  selectedPeriod: Period;
};

const StatsExecutionStatus = async ({ selectedPeriod }: Props) => {
  const data = await getWorkflowExecutionStats(selectedPeriod);

  return <ExecutionStatusChart data={data} />;
};

export default StatsExecutionStatus;
