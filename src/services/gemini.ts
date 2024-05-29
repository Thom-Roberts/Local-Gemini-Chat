/*
 * NOTE: Your prompt contains media inputs that are not directly supported by the
 * Gemini Files API. Preprocessing will be required for these inputs. Specific
 * information is provided below.
 */

/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 *
 * See the getting started guide for more information
 * https://ai.google.dev/gemini-api/docs/get-started/node
 */

import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
  GenerationConfig,
  SafetySetting,
  ChatSession,
} from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig: GenerationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

const safetySettings: SafetySetting[] = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
];

let chatSession: ChatSession;

const createModel = async () => {
  chatSession = model.startChat({
    generationConfig,
    safetySettings,
  });
};

/*
 * TODO Extract file contents
 * File inputs cannot be directly provided to the model. You can use file data as
 * a prompt input by extracting its text. The specific method for doing so will
 * depend on the file type.
 *
 * See here for more information and updates:
 * https://ai.google.dev/gemini-api/docs/prompting_with_media#supported_file_formats
 */

export const sendMessage = async (input: string) => {
  const result = await chatSession.sendMessage(input);
  return result;
};

export const getHistory = async () => {
  const history = await chatSession.getHistory();
  console.log("History length", history.length);
  return history;
};

// run();
createModel();
