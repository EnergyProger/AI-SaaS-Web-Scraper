import { TaskType } from "@/types/task";
import { launchBrowserExecutor } from "./launch-browser-executor";
import { pageToHTMLExecutor } from "./page-to-html-executor";
import { ExecutionEnvironment } from "@/types/executor";
import { WorkflowTask } from "@/types/workflow";
import { extractTextFromElementExecutor } from "./extract-text-from-element-executor";
import { fillInputExecutor } from "./fill-input-executor";
import { clickElementExecutor } from "./click-element-executor";
import { waitForElementExecutor } from "./wait-for-element-executor";
import { deliverViaWebhookExecutor } from "./deliver-via-webhook-executor";
import { extractDataWithAIExecutor } from "./extract-data-with-ai-executor";
import { readPropertyFromJSONExecutor } from "./read-property-from-json-executor";
import { addPropertyToJSONExecutor } from "./add-property-to-json-executor";
import { navigateUrlExecutor } from "./navigate-url-executor";

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
  FILL_INPUT: fillInputExecutor,
  CLICK_ELEMENT: clickElementExecutor,
  WAIT_FOR_ELEMENT: waitForElementExecutor,
  DELIVER_VIA_WEBHOOK: deliverViaWebhookExecutor,
  EXTRACT_DATA_WITH_AI: extractDataWithAIExecutor,
  READ_PROPERTY_FROM_JSON: readPropertyFromJSONExecutor,
  ADD_PROPERTY_TO_JSON: addPropertyToJSONExecutor,
  NAVIGATE_URL: navigateUrlExecutor,
};
