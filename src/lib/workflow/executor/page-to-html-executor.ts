import { ExecutionEnvironment } from "@/types/executor";
import { PageToHTMLTask } from "../task/page-to-html";

export const pageToHTMLExecutor = async (
  environment: ExecutionEnvironment<typeof PageToHTMLTask>
): Promise<boolean> => {
  try {
    const html = await environment.getPage()!.content();
    environment.setOutput("HTML", html);

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
