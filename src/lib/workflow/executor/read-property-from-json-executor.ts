import { ExecutionEnvironment } from "@/types/executor";
import { ReadPropertyFromJSONTask } from "../task/read-property-from-json";

export const readPropertyFromJSONExecutor = async (
  environment: ExecutionEnvironment<typeof ReadPropertyFromJSONTask>
): Promise<boolean> => {
  try {
    const jsonData = environment.getInput("JSON");

    if (!jsonData) {
      environment.log.error("input->JSON not defined");
      return false;
    }

    const propertyName = environment.getInput("Property name");

    if (!propertyName) {
      environment.log.error("input->property name not defined");
      return false;
    }

    const json = JSON.parse(jsonData);
    const propertyValue = json[propertyName];

    if (propertyValue === undefined) {
      environment.log.error("Property not found");
      return false;
    }

    environment.setOutput("Property value", propertyValue);

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
