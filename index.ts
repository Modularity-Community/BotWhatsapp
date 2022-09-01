import { Client, DefaultOptions } from "whatsapp-web.js";
const client = new Client(DefaultOptions);
const qrCode = require("qrcode-terminal");

client.on("qr", (qr) => {
  qrCode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is Ready");
});

client.on("message", (message) => {
  if (message.body == "!hello-bot") {
    message.reply("hello aku bot");
  }
});

client.initialize();
