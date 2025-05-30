import { ExecutionEnvironment } from "@/types/executor";
import { ExtractTextFromElementTask } from "../task/extract-text-from-element";
import * as cheerio from "cheerio";

export const extractTextFromElementExecutor = async (
  environment: ExecutionEnvironment<typeof ExtractTextFromElementTask>
): Promise<boolean> => {
  try {
    const selector = environment.getInput("Selector");

    if (!selector) {
      environment.log.error("Selector not defined");
      return false;
    }

    const html = environment.getInput("HTML");

    if (!html) {
      environment.log.error("HTML not defined");
      return false;
    }

    const $ = cheerio.load(html);
    const element = $(selector);

    if (!element) {
      environment.log.error("Element not found");
      return false;
    }

    const extractedText = $.text(element);

    if (!extractedText) {
      environment.log.error("Element has no text");
      return false;
    }

    environment.setOutput("Extracted text", extractedText);

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
