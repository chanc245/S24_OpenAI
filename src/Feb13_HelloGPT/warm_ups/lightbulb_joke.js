/**
 * this app asks the user for a subject and then
 * prints out a light bulb joke about that subject.
 */

import { gptPrompt } from "../../shared/openai.js";
import { ask, say } from "../../shared/cli.js";

main();

async function main() {
  say("Hello, user!");

  const subject = await ask("Please pick a subject: ");

  say("");

  const prompt = `Please generate a light bulb joke about ${subject}
    `;

  //rule ref https://www.grammarly.com/blog/how-to-write-haiku/

  const lightBulbJoke = await gptPrompt(prompt, { temperature: 0.7 });
  say(`"""\n${lightBulbJoke}\n"""`);
}
