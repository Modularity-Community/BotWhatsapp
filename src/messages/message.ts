import { Client, List, MessageMedia } from "whatsapp-web.js";
import { completionText } from "../openai/completionText";
import { imageGeneration } from "../openai/imageGeneration";
import { variationImage } from "../openai/variationImage";
import { Buffer } from "buffer";

export function replyMessage(client: Client) {
  client.on("message", async (msg) => {
    const payload = msg.body.split(":");
  if (payload[0] == "!nanya") {
      try {
        await completionText(payload[1])
          .then((value) => {
            msg.reply(value.get("data"));
          })
          .catch((error) => {
            msg.reply(error.get("data"));
          });
      } catch (error) {
        msg.reply("Bot nya lagi error,coba ulangi sekali lagi");
      }
    }
    if (payload[0] == "!img") {
      try {
        await imageGeneration(payload[1])
          .then(async (value) => {
            var media: MessageMedia = await MessageMedia.fromUrl(
              value.get("data")
            );
            msg.reply(media);
          })
          .catch((error) => {
            msg.reply(error.get("data"));
          });
      } catch (error) {
        msg.reply("Bot nya lagi error,coba ulangi sekali lagi");
      }
    }
    if (payload[0] == "!vimg") {
      try {
        if (msg.hasMedia) {
          const media = await msg.downloadMedia();
          const buffer = Buffer.from(
            `data:image/png;base64,${media.data}`,
            "base64"
          );
          const file: any = buffer;

          file.name = `${media.filename || Date.now()}.png`;

          variationImage(file)
            .then(async (value) => {
              var media: MessageMedia = await MessageMedia.fromUrl(
                value.get("data")
              );
              msg.reply(media);
            })
            .catch((error) => {
              msg.reply(error.get("data"));
            });
        }
      } catch (error) {
        console.log(error);
        msg.reply("Bot nya lagi error,coba ulangi sekali lagi");
      }
    }
  });
}
