import { Configuration, OpenAIApi } from "openai";
import { OPENAI_KEY } from "../utils/environment";

const configuration = new Configuration({
  apiKey: OPENAI_KEY,
});

const OpenAiConf = new OpenAIApi(configuration);

export { OpenAiConf };
