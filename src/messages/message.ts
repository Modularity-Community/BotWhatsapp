import { Client } from "whatsapp-web.js";

let listOfCommand = ["!hello-bot", "!discord"];

export function replyMessage(client: Client) {
  client.on("message", (msg) => {
    if (msg.body == "!hello-bot") {
      msg.reply("Hello, apa kabar ?");
    }
    if (msg.body == "!discord") {
      msg.reply("ini link discord ya\nhttps://discord.gg/66egFaDkPH");
    }
    if (msg.body == "!all-command") {
      msg.reply(`Ini list nya : ${listOfCommand}`);
    }
  });
}
