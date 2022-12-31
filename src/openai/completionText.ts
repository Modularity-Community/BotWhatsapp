import { OpenAiConf } from "../utils/openAiInit";

export function completionText(prompt: string): Promise<Map<string, any>> {
  const myMap = new Map<string, any>();
  return new Promise(async (resolve, reject) => {
    console.log(prompt)
    await OpenAiConf.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0.9,
      max_tokens: 3833,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0.6,
    })
      .then((value) => {
        myMap.set("data", value.data.choices[0].text || "Tidak ada jawaban");
        myMap.set("code", 200);
        resolve(myMap);
      })
      .catch(function (error) {
        console.log(error);
        myMap.set("data", "Limit habis");
        myMap.set("code", error.response.status);
        reject(myMap);
      });
  });
}
