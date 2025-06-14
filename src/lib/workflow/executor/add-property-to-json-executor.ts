import { ExecutionEnvironment } from "@/types/executor";
import { AddPropertyToJSONTask } from "../task/add-property-to-json";

export const addPropertyToJSONExecutor = async (
  environment: ExecutionEnvironment<typeof AddPropertyToJSONTask>
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

    const propertyValue = environment.getInput("Property value");

    if (!propertyValue) {
      environment.log.error("input->property value not defined");
      return false;
    }

    const json = JSON.parse(jsonData);
    json[propertyName] = propertyValue;

    environment.setOutput("Update JSON", JSON.stringify(json));

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
