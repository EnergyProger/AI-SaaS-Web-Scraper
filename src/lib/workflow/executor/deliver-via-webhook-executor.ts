import { ExecutionEnvironment } from "@/types/executor";
import { DeliverViaWebhookTask } from "../task/deliver-via-webhook";

export const deliverViaWebhookExecutor = async (
  environment: ExecutionEnvironment<typeof DeliverViaWebhookTask>
): Promise<boolean> => {
  try {
    const targetURL = environment.getInput("Target URL");

    if (!targetURL) {
      environment.log.error("input->targetURL not defined");
      return false;
    }

    const body = environment.getInput("Body");

    if (!body) {
      environment.log.error("input->body not defined");
      return false;
    }

    const response = await fetch(targetURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const statusCode = response.status;

    if (statusCode !== 200) {
      environment.log.error(`status code: ${statusCode}`);
      return false;
    }

    const responseBody = await response.json();
    environment.log.info(JSON.stringify(responseBody, null, 4));

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
