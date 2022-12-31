import { OpenAiConf } from "../utils/openAiInit";

export function variationImage(file: any): Promise<Map<string, any>> {
  const myMap = new Map<string, any>();
  return new Promise(async (resolve, reject) => {
    await OpenAiConf.createImageVariation(file, 1, "1024x1024")
      .then((value) => {
        myMap.set("data", value.data.data[0].url);
        myMap.set("code", 200);
        resolve(myMap);
      })
      .catch((error) => {
        console.log(error);
        myMap.set("data", "gabisa generate gambar, coba ulangi lain kali");
        myMap.set("code", error);
        reject(myMap);
      });
  });
}
