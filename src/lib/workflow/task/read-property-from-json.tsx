import { TASK_READ_PROPERTY_FROM_JSON_CREDIT } from "@/constants/tasks";
import { TaskParamType, TaskType } from "@/types/task";
import { WorkflowTask } from "@/types/workflow";
import { FileJson2, LucideProps } from "lucide-react";

export const ReadPropertyFromJSONTask = {
  type: TaskType.READ_PROPERTY_FROM_JSON,
  label: "Read property from JSON",
  icon: (props: LucideProps) => (
    <FileJson2 className="stroke-orange-400" {...props} />
  ),
  isEntryPoint: false,
  credits: TASK_READ_PROPERTY_FROM_JSON_CREDIT,
  inputs: [
    {
      name: "JSON",
      type: TaskParamType.STRING,
      required: true,
    },
    {
      name: "Property name",
      type: TaskParamType.STRING,
      required: true,
    },
  ] as const,
  outputs: [
    {
      name: "Property value",
      type: TaskParamType.STRING,
    },
  ] as const,
} satisfies WorkflowTask;
