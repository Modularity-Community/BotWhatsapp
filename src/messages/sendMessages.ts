import { Client } from "whatsapp-web.js";

function replyMessage(client: Client) {
  client.on("message", (msg) => {
    if (msg.body == "!hello-bot") {
      msg.reply("Hello.");
    }
  });
}
