/**
 * This program where chatGPT play lateral thinking puzzles with you.
 */

import { gptPrompt } from "../shared/openai.js";
import { ask, say } from "../shared/cli.js";

main();

async function main() {
  let playing = true;

  say("Hello, Player!");

  say(
    "Six pieces of coal, a carrot, and a scarf are lying on the lawn. Nobody put them on the lawn but there is a perfectly logical reason why they should be there. What is it?",
  );

  while (playing) {
    const guess = await ask("Ask me to progress:");

    if (guess == "quit") {
      playing = false;
    }

    const prompt = `You are an AI assisting in a puzzle game. 
    you speaks in a calm, thoughtful manner, often using metaphors.

    The current puzzle for the player to guess is: [Six pieces of coal, a carrot, and a scarf are lying on the lawn. Nobody put them on the lawn but there is a perfectly logical reason why they should be there. What is it?]. 
    The answer is: [A snowman was built by human in the yard, and the snow has since melted because the weather turn hot, leaving the eyes(coal), nose(carrot), mouth(coal), and scarf(scarf) on the ground.]
    
    You should respond to the player’s guesses with only "yes", "no", or "doesn\'t relate".
    always aiming to maintain the mystery of the puzzle. Allow misspellings.
    
    player's current guess is: ${guess}
    `;

    const Guess = await gptPrompt(prompt, { temperature: 0.7 });
    say(`"""\n${Guess}\n"""`);
  }
}
