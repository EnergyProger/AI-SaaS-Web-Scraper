import { TaskParamType } from "@/types/task";
import { WorkflowStatus } from "@/types/workflow";
import {
  CoinsIcon,
  HomeIcon,
  Layers2Icon,
  ShieldCheckIcon,
} from "lucide-react";

export const LOGO_FONT_SIZE = "2xl";
export const LOGO_ICON_SIZE = 20;
export const DEFAULT_ICON_SIZE = 20;

export const SIDEBAR_ROUTES = [
  {
    href: "/",
    label: "Home",
    icon: HomeIcon,
  },
  {
    href: "workflows",
    label: "Workflows",
    icon: Layers2Icon,
  },
  {
    href: "credentials",
    label: "Credentials",
    icon: ShieldCheckIcon,
  },
  {
    href: "billing",
    label: "Billing",
    icon: CoinsIcon,
  },
];

export const DEFAULT_WORKFLOW_SKELETON = [1, 2, 3, 4];
export const EMPTY_WORKFLOWS_ICON_SIZE = 40;
export const DIALOG_HEADER_ICON_SIZE = 30;
export const WORKFLOW_STATUS_COLORS = {
  [WorkflowStatus.DRAFT]: "bg-yellow-400 text-yellow-600",
  [WorkflowStatus.PUBLISHED]: "bg-primary",
};
export const WORKFLOW_CARD_EDIT_ICON_SIZE = 16;
export const WORKFLOW_CARD_ACTIONS_ICON_SIZE = 18;
export const TOOLTIP_PROVIDER_DELAY_DURATION = 0;

export const EDITOR_BACKGROUND_VARIANT_GAP = 12;
export const EDITOR_BACKGROUND_VARIANT_SIZE = 1;
export const EDITOR_LOADING_ICON_SIZE = 30;
export const TASK_ICON_SIZE = 16;
export const DEFAULT_NODE_ICON_SIZE = 16;
export const TOPBAR_ICON_SIZE = 16;
export const COLOR_FOR_NODE_HANDLE: Record<TaskParamType, string> = {
  BROWSER_INSTANCE: "!bg-sky-400",
  STRING: "!bg-amber-400",
};
export const COPY_NODE_POSITION_X = 20;
export const LAUNCH_BROWSER_TASK_CREDIT = 5;
export const DEFAULT_TASK_CREDIT = 2;

export const LOG_TIMESTAMP_TABLE_CELL_WIDTH = 190;
export const LOG_LEVEL_TABLE_CELL_WIDTH = 80;

export const CREDITS_COUNT_UP_DURATION = 0.5;
export const CREDITS_COUNT_UP_DECIMALS = 0;
export const USER_BALANCE_REFETCH_INTERVAL = 30 * 1000;

export const EXECUTION_REFETCH_INTERVAL = 1000;
export const EMPTY_EXECUTION_RUNS_ICON_SIZE = 40;
export const EXECUTION_RUNS_REFETCH_INTERVAL = 5000;

export const COLOR_TOP_LOADER = "#10b981";
