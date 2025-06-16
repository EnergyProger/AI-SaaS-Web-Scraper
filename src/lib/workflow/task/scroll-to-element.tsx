import { TASK_SCROLL_TO_ELEMENT_CREDIT } from "@/constants/tasks";
import { TaskParamType, TaskType } from "@/types/task";
import { WorkflowTask } from "@/types/workflow";
import { ArrowUp, LucideProps } from "lucide-react";

export const ScrollToElementTask = {
  type: TaskType.SCROLL_TO_ELEMENT,
  label: "Scroll to element",
  icon: (props: LucideProps) => (
    <ArrowUp className="stroke-orange-400" {...props} />
  ),
  isEntryPoint: false,
  credits: TASK_SCROLL_TO_ELEMENT_CREDIT,
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
  ] as const,
  outputs: [
    {
      name: "Web page",
      type: TaskParamType.BROWSER_INSTANCE,
    },
  ] as const,
} satisfies WorkflowTask;
