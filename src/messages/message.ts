import { Client, List } from "whatsapp-web.js";
import { Configuration, OpenAIApi } from "openai";

import * as dotenv from "dotenv";
dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_KEY,
});

const openai = new OpenAIApi(configuration);

const prompt: string[] = [];

export function replyMessage(client: Client) {
  client.on("message", async (msg) => {
    const payload = msg.body.split(":");
    if (payload[0] == "!bertanya" || payload[0] == "!Bertanya") {
      try {
        const human = `orang: ${payload[1]}\n`;
        prompt.push(human);

        await openai
          .createCompletion({
            model: "text-davinci-003",
            prompt: prompt.join(" "),
            temperature: 0.9,
            max_tokens: 4097,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0.6,
            stop: [" orang:", " ai:"],
          })
          .then((value) => {
            const ai = `ai: ${value.data.choices[0].text}\n`;
            prompt.push(ai);

            console.log(prompt.join(" "));

            msg.reply(value.data.choices[0].text || "Tidak ada jawaban");
          })
          .catch(function (error) {
            if (error.response.status == 400) {
              prompt.length = 0;
              msg.reply(
                "limit sudah habis, mencoba membersihkan session. tolong ulangi pertanyaan nya lagi"
              );
            }
            console.log(error.response);
          });
      } catch (error) {
        prompt.length = 0;
        msg.reply("Bot nya lagi error,coba ulangi sekali lagi");
      }
    }
  });
}
