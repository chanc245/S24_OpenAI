/**
 * This program judge your code based on how you name your variable
 * simple --> ask for code and give feedback in two sentence with a score
 */

import { gptPrompt } from "../shared/openai.js";
import { ask, say } from "../shared/cli.js";

main();

async function main() {
  say("Hello, Coder!");

  say(
    "Hi! This is a terminal App where when you input your code, I will judge your code!",
  );

  const inputCode = await ask("Input your code please");

  const prompt =
    `Given the following code snippet, evaluate the clarity and descriptiveness of the variable names. Consider if the names give a clear understanding of what data they hold and if they follow common naming conventions for readability. 
    Review the overall layout and structure of this code snippet. Comment on its readability, organization, and adherence to coding standards.
    Based on an evaluation of variable naming clarity and overall code layout, provide an overall score out of 10 for this code snippet. Offer a brief justification for your score, considering the clarity of variable names and the readability and organization of the code.
    Please respond in a fun way, within two setence with a score.
  Code snippet:
  ${inputCode}
    `;

  const Judge = await gptPrompt(prompt, { temperature: 0.7 });
  say(`"""\n${Judge}\n"""`);
}
