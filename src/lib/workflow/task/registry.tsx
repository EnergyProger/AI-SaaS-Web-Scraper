import { TaskType } from "@/types/task";
import { ExtractTextFromElementTask } from "./extract-text-from-element";
import { LaunchBrowserTask } from "./launch-browser";
import { PageToHTMLTask } from "./page-to-html";
import { WorkflowTask } from "@/types/workflow";
import { FillInputTask } from "./fill-input";
import { ClickElementTask } from "./click-element";
import { WaitForElementTask } from "./wait-for-element";
import { DeliverViaWebhookTask } from "./deliver-via-webhook";
import { ExtractDataWithAITask } from "./extract-data-with-ai";
import { ReadPropertyFromJSONTask } from "./read-property-from-json";
import { AddPropertyToJSONTask } from "./add-property-to-json";
import { NavigateUrlTask } from "./navigate-url";
import { ScrollToElementTask } from "./scroll-to-element";

type Registry = {
  [K in TaskType]: WorkflowTask & { type: K };
};

export const TaskRegistry: Registry = {
  LAUNCH_BROWSER: LaunchBrowserTask,
  PAGE_TO_HTML: PageToHTMLTask,
  EXTRACT_TEXT_FROM_ELEMENT: ExtractTextFromElementTask,
  FILL_INPUT: FillInputTask,
  CLICK_ELEMENT: ClickElementTask,
  WAIT_FOR_ELEMENT: WaitForElementTask,
  DELIVER_VIA_WEBHOOK: DeliverViaWebhookTask,
  EXTRACT_DATA_WITH_AI: ExtractDataWithAITask,
  READ_PROPERTY_FROM_JSON: ReadPropertyFromJSONTask,
  ADD_PROPERTY_TO_JSON: AddPropertyToJSONTask,
  NAVIGATE_URL: NavigateUrlTask,
  SCROLL_TO_ELEMENT: ScrollToElementTask,
};
