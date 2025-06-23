import {
  getCreditsUsageInPeriod,
  getWorkflowExecutionStats,
} from "@/actions/analytics";

export type Period = {
  month: number;
  year: number;
};

export type WorkflowsExecutionChartData = Awaited<
  ReturnType<typeof getWorkflowExecutionStats>
>;
export type CreditsUsageChartData = Awaited<
  ReturnType<typeof getCreditsUsageInPeriod>
>;
