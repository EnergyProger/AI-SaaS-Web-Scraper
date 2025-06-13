import { ExecutionEnvironment } from "@/types/executor";
import { WaitForElementTask } from "../task/wait-for-element";
import {
  WAIT_FOR_SELECTED_ELEMENT_HIDDEN,
  WAIT_FOR_SELECTED_ELEMENT_VISIBLE,
} from "@/constants/common";

export const waitForElementExecutor = async (
  environment: ExecutionEnvironment<typeof WaitForElementTask>
): Promise<boolean> => {
  try {
    const selector = environment.getInput("Selector");

    if (!selector) {
      environment.log.error("input->selector not defined");
      return false;
    }

    const visibility = environment.getInput("Visibility");

    if (!visibility) {
      environment.log.error("input->visibility not defined");
      return false;
    }

    await environment.getPage()!.waitForSelector(selector, {
      visible: visibility === WAIT_FOR_SELECTED_ELEMENT_VISIBLE,
      hidden: visibility === WAIT_FOR_SELECTED_ELEMENT_HIDDEN,
    });

    environment.log.info(
      `Element with selector "${selector}" is now ${visibility}`
    );

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
