import { TASK_EXTRACT_DATA_WITH_AI_CREDIT } from "@/constants/tasks";
import { TaskParamType, TaskType } from "@/types/task";
import { WorkflowTask } from "@/types/workflow";
import { Brain, LucideProps } from "lucide-react";

export const ExtractDataWithAITask = {
  type: TaskType.EXTRACT_DATA_WITH_AI,
  label: "Extract data with AI",
  icon: (props: LucideProps) => (
    <Brain className="stroke-rose-400" {...props} />
  ),
  isEntryPoint: false,
  credits: TASK_EXTRACT_DATA_WITH_AI_CREDIT,
  inputs: [
    {
      name: "Content",
      type: TaskParamType.STRING,
      required: true,
    },
    {
      name: "Credentials",
      type: TaskParamType.CREDENTIAL,
      required: true,
    },
    {
      name: "Prompt",
      type: TaskParamType.STRING,
      required: true,
      variant: "textarea",
    },
  ] as const,
  outputs: [
    {
      name: "Extracted data",
      type: TaskParamType.STRING,
    },
  ] as const,
} satisfies WorkflowTask;
