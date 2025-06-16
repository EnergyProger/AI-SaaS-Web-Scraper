import { ExecutionEnvironment } from "@/types/executor";
import { NavigateUrlTask } from "../task/navigate-url";

export const navigateUrlExecutor = async (
  environment: ExecutionEnvironment<typeof NavigateUrlTask>
): Promise<boolean> => {
  try {
    const url = environment.getInput("URL");

    if (!url) {
      environment.log.error("input->url not defined");
      return false;
    }

    await environment.getPage()!.goto(url);
    environment.log.info(`Visited ${url}`);

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
