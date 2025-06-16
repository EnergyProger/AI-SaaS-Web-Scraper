import { ExecutionEnvironment } from "@/types/executor";
import { ScrollToElementTask } from "../task/scroll-to-element";

export const scrollToElementExecutor = async (
  environment: ExecutionEnvironment<typeof ScrollToElementTask>
): Promise<boolean> => {
  try {
    const selector = environment.getInput("Selector");

    if (!selector) {
      environment.log.error("input->selector not defined");
      return false;
    }

    await environment.getPage()!.evaluate((selector) => {
      const element = document.querySelector(selector);

      if (!element) {
        throw new Error("Element not found");
      }

      const top = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top });
    }, selector);

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
