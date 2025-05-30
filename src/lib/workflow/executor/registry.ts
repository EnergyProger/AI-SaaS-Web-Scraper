import { TaskType } from "@/types/task";
import { launchBrowserExecutor } from "./launch-browser-executor";
import { pageToHTMLExecutor } from "./page-to-html-executor";
import { ExecutionEnvironment } from "@/types/executor";
import { WorkflowTask } from "@/types/workflow";
import { extractTextFromElementExecutor } from "./extract-text-from-element-executor";

type ExecutorFn<T extends WorkflowTask> = (
  environment: ExecutionEnvironment<T>
) => Promise<boolean>;

type RegistryType = {
  [K in TaskType]: ExecutorFn<WorkflowTask & { type: K }>;
};

export const ExecutorRegistry: RegistryType = {
  LAUNCH_BROWSER: launchBrowserExecutor,
  PAGE_TO_HTML: pageToHTMLExecutor,
  EXTRACT_TEXT_FROM_ELEMENT: extractTextFromElementExecutor,
};
