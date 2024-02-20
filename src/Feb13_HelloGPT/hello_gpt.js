/**
 * To help user to communicate with ChatGPT effectively.
 * User: enter what they want to ask
 * output: have
 */

import { ask, say } from "../shared/cli.js";
import { gptPrompt } from "../shared/openai.js";

main();

async function main() {
  say("Hello, GPT!");

  const response = ask("What do you want to ask? ");

  const result = await gptPrompt(
    response,
    { temperature: 1 },
  );

  say(`\n${result}`);
}
