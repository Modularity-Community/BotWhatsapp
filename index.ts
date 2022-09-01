import { Client, LocalAuth } from "whatsapp-web.js";
import { replyMessage } from "./src/index";
const client = new Client({
  authStrategy: new LocalAuth(),
});

const qrCode = require("qrcode-terminal");

client.on("qr", (qr) => {
  qrCode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is Ready");
});

replyMessage(client);

client.initialize();
