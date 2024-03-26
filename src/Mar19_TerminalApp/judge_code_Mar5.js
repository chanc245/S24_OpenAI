/**
 * This program judges your code based on how you name your variables.
 * Flow:
 * 1. Harshness 1-10
 * 2. input your code
 * 3. Feedback (y/n)
 * 4. (if yes) What style of feedback? (fun, lighthearted etc)
 */

import { gptPrompt } from "../shared/openai.js";
import { ask, say } from "../shared/cli.js";

main();

async function main() {
  say("Hello, Coder!");

  say(
    "\nWelcome! This is a terminal App where you can input your code, and I will judge your code based on the clarity of your variable names.",
  );

  const judgmentLevel = await ask(
    "\nHow harshly do you want your code judged? Enter a number from 1 (gentle) to 10 (harsh).",
  );

  const inputCode = await ask("\nPlease input your code:");

  const prompt = `
    Please provide an overall score out of 10 for the clarity of variable names in this code snippet. 
    The judgment harshness level is ${judgmentLevel}.

    Code snippet:
    ${inputCode}

    NUMBERS ONLY, (for example: 5/10), do NOT provide word explination
  `;

  const rawScore = await gptPrompt(prompt, { temperature: 0.7 });
  say(`\nYour code's variable naming score: ${rawScore}`);

  const feedbackInterest = await ask(
    "\nWould you like some feedback on how you name your variables? (yes/no)",
  );

  if (feedbackInterest.toLowerCase() === "yes") {
    const feedbackStyle = await ask(
      "\nWhat style of feedback would you like? (fun, lighthearted, etc.)",
    );

    const feedbackPrompt = `
    \nGiven the code snippet provided and considering the requested feedback style to be ${feedbackStyle}, 
      offer insights on the clarity and descriptiveness of the variable names. Provide constructive feedback in a ${feedbackStyle} manner.
      Respond in list
      
      Code snippet:
      ${inputCode}
    `;

    const feedback = await gptPrompt(feedbackPrompt, { temperature: 0.9 });
    say(`Feedback on your variable names: """\n${feedback}\n"""`);
  } else {
    say("\nAlright, no feedback requested. Happy coding!");
  }
}
