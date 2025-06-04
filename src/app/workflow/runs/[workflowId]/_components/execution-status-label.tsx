import { cn } from "@/lib/utils";
import { WorkflowExecutionStatus } from "@/types/workflow";
import React from "react";

const labelColors: Record<WorkflowExecutionStatus, string> = {
  PENDING: "text-slate-400",
  RUNNING: "text-yellow-400",
  FAILED: "text-red-400",
  COMPLETED: "text-emerald-400",
};

type Props = {
  status: WorkflowExecutionStatus;
};

const ExecutionStatusLabel = ({ status }: Props) => {
  return <span className={cn("lowercase", labelColors[status])}>{status}</span>;
};

export default ExecutionStatusLabel;
