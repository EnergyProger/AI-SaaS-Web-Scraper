import { TaskParamType } from "@/types/task";
import { WorkflowStatus } from "@/types/workflow";

export const COLORS_WORKFLOW_STATUS = {
  [WorkflowStatus.DRAFT]: "bg-yellow-400 text-yellow-600",
  [WorkflowStatus.PUBLISHED]: "bg-primary",
};

export const COLORS_FOR_NODE_HANDLE: Record<TaskParamType, string> = {
  BROWSER_INSTANCE: "!bg-sky-400",
  STRING: "!bg-amber-400",
  SELECT: "!bg-rose-400",
  CREDENTIAL: "!bg-teal-400",
};

export const COLOR_TOP_LOADER = "#10b981";
