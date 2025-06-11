import { ExecutionEnvironment } from "@/types/executor";
import { ClickElementTask } from "../task/click-element";

export const clickElementExecutor = async (
  environment: ExecutionEnvironment<typeof ClickElementTask>
): Promise<boolean> => {
  try {
    const selector = environment.getInput("Selector");

    if (!selector) {
      environment.log.error("input->selector not defined");
      return false;
    }

    await environment.getPage()!.click(selector);

    return true;
  } catch (error) {
    if (error instanceof Error) {
      environment.log.error(error.message);
    } else {
      environment.log.error("Something went wrong");
    }

    return false;
  }
};
