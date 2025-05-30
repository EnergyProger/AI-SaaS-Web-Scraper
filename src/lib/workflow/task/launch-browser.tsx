import { LAUNCH_BROWSER_TASK_CREDIT } from "@/constants/constants";
import { TaskParamType, TaskType } from "@/types/task";
import { WorkflowTask } from "@/types/workflow";
import { Globe, LucideProps } from "lucide-react";

export const LaunchBrowserTask = {
  type: TaskType.LAUNCH_BROWSER,
  label: "Launch browser",
  icon: (props: LucideProps) => (
    <Globe className="stroke-pink-400" {...props} />
  ),
  isEntryPoint: true,
  credits: LAUNCH_BROWSER_TASK_CREDIT,
  inputs: [
    {
      name: "Website URL",
      type: TaskParamType.STRING,
      helperText: "eg: https://www.google.com",
      required: true,
      hideHandle: true,
    },
  ] as const,
  outputs: [
    {
      name: "Web page",
      type: TaskParamType.BROWSER_INSTANCE,
    },
  ] as const,
} satisfies WorkflowTask;
