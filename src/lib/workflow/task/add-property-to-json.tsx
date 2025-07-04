import { TASK_ADD_PROPERTY_TO_JSON_CREDIT } from "@/constants/tasks";
import { TaskParamType, TaskType } from "@/types/task";
import { WorkflowTask } from "@/types/workflow";
import { Database, LucideProps } from "lucide-react";

export const AddPropertyToJSONTask = {
  type: TaskType.ADD_PROPERTY_TO_JSON,
  label: "Add property to JSON",
  icon: (props: LucideProps) => (
    <Database className="stroke-orange-400" {...props} />
  ),
  isEntryPoint: false,
  credits: TASK_ADD_PROPERTY_TO_JSON_CREDIT,
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
    {
      name: "Property value",
      type: TaskParamType.STRING,
      required: true,
    },
  ] as const,
  outputs: [
    {
      name: "Update JSON",
      type: TaskParamType.STRING,
    },
  ] as const,
} satisfies WorkflowTask;
