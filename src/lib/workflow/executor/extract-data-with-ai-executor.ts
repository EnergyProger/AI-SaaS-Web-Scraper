import { ExecutionEnvironment } from "@/types/executor";
import { ExtractDataWithAITask } from "../task/extract-data-with-ai";
import { prisma } from "@/lib/prisma";
import { symmetricDecrypt } from "@/lib/encryption";
import { AI_TEMPERATURE } from "@/constants/ai";
import OpenAI from "openai";

export const extractDataWithAIExecutor = async (
  environment: ExecutionEnvironment<typeof ExtractDataWithAITask>
): Promise<boolean> => {
  try {
    const credentials = environment.getInput("Credentials");

    if (!credentials) {
      environment.log.error("input->credentials not defined");
      return false;
    }

    const prompt = environment.getInput("Prompt");

    if (!prompt) {
      environment.log.error("input->prompt not defined");
      return false;
    }

    const content = environment.getInput("Content");

    if (!content) {
      environment.log.error("input->content not defined");
      return false;
    }

    const credential = await prisma.credential.findUnique({
      where: {
        id: credentials,
      },
    });

    if (!credential) {
      environment.log.error("Credential not found");
      return false;
    }

    const plainCredentialValue = symmetricDecrypt(credential.value);

    if (!plainCredentialValue) {
      environment.log.error("Cannot decrypt credential");
      return false;
    }

    const openAI = new OpenAI({
      apiKey: plainCredentialValue,
    });

    const response = await openAI.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are a webscraper helper that extracts data from HTML or text. 
          You will be given a piece of text or HTML content as input and also the prompt with the data you have 
          to extract. The response should always be only the extracted data as a JSON array or object, without 
          any additional words or explanations. Analyze the input carefully and extract data precisely 
          based on the prompt. If no data is found, return an empty JSON array. Work only with the provided content 
          and ensure the output is always a valid JSON array without any surrounding text`,
        },
        {
          role: "user",
          content: content,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: AI_TEMPERATURE,
    });

    environment.log.info(`Prompt tokens: ${response.usage?.prompt_tokens}`);
    environment.log.info(
      `Completion tokens: ${response.usage?.completion_tokens}`
    );

    const result = response.choices[0].message?.content;

    if (!result) {
      environment.log.error(`Empty response from AI`);
      return false;
    }

    environment.setOutput("Extracted data", result);

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
