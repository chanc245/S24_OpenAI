/**
 * triva.js
 * Uses GPT to generate trivia questions based on a user-provided topic.
 * Uses GPT to evaluate the answers.
 */
import { ask, say } from "../../shared/cli.js";
import { gptPrompt } from "../../shared/openai.js";

main();

// let counter = 0;

async function main() {
  say("Hello, Player!");

  const topic = await ask("What do you want to be quized on?");

  const questionsString = await gptPrompt(
    `
    Generate 4 questions for a triva game. Do not provide answers.
    The topic is ${topic}.
    provide the questions as a javascript array of strings like this:
    ["question 1", "question 2", "question 3", "question 4"]

    Include only the array, start with [ and end with ].
    `,
    { max_tokens: 1024, temperature: 0.3 }, //original
    // { max_tokens: 1024, temperature: 0.1 }, //low temperature
    // { max_tokens: 1024, temperature: 1.8 }, //high thmperature

    // * low_temp: respond are more 'stable' in a way, the structure are easier to understand and more precise.
    // * high_temp: respond from chatGPT are more randomly (sometimes with soemthing that seems 'unprocesses), and less structure.
  );

  let questions = [];
  try {
    questions = JSON.parse(questionsString);
  } catch (_e) {
    say(`Error parsing questions string: "${questionsString}"`);
    end();
    return;
  }

  say("");

  for (const q of questions) {
    const a = await ask(q);
    const response = await gptPrompt(
      `
    The question was '${q}'.
    The provided answer was '${a}'.
    Was the answer correct? if the answer is correct add to counter.
    Be an easy grader. Accept answers that are close enough. Allow misspellings.
    Answer yes or no. If no, provide the correct answer.

    display counter please.
    `,
      { max_tokens: 64, temperature: 0.1 },
    );
    say(response);
    say("");
  }
}
