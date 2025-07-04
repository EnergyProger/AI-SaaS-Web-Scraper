import { TASK_FILL_INPUT_CREDIT } from "@/constants/tasks";
import { TaskParamType, TaskType } from "@/types/task";
import { WorkflowTask } from "@/types/workflow";
import { Edit3, LucideProps } from "lucide-react";

export const FillInputTask = {
  type: TaskType.FILL_INPUT,
  label: "Fill input",
  icon: (props: LucideProps) => (
    <Edit3 className="stroke-orange-400" {...props} />
  ),
  isEntryPoint: false,
  credits: TASK_FILL_INPUT_CREDIT,
  inputs: [
    {
      name: "Web page",
      type: TaskParamType.BROWSER_INSTANCE,
      required: true,
    },
    {
      name: "Selector",
      type: TaskParamType.STRING,
      required: true,
    },
    {
      name: "Value",
      type: TaskParamType.STRING,
      required: true,
    },
  ] as const,
  outputs: [
    {
      name: "Web page",
      type: TaskParamType.BROWSER_INSTANCE,
    },
  ] as const,
} satisfies WorkflowTask;
