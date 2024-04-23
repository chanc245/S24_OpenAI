import dedent from "npm:dedent@1.5.1";
import { gptPrompt } from "../../../shared/openai.js";

// ---------- TERMINAL ---------- //
// ---------- TERMINAL ---------- //
// ---------- TERMINAL ---------- //
// ---------- TERMINAL ---------- //
// ---------- TERMINAL ---------- //

$("#commandDiv").terminal({
  start: async function () {
    // this.echo("");
    loadPuzzle.call(this);
  },
}, {
  greetings: `
Game Rule: 
  * I will present a scenario.
  * Your goal is to solve the puzzle by using the clues in the scenario and asking me questions.
  * You can ask me any question related to the scenario, but I can only answer with "Yes," "No," or "Doesn't relate."
  
With the rule stated.. let's start :)

to start, please type start
  `,
});

// ---------- TERMINAL ---------- //
// ---------- TERMINAL ---------- //
// ---------- TERMINAL ---------- //
// ---------- TERMINAL ---------- //
// ---------- TERMINAL ---------- //

const puzzles = [
  {
    setup:
      "There was a cook who always makes the perfect meal for the mansion, yet he never gets to eat his own food? Why?",
    solution:
      "The master’s favorite food was carrot, which the chef was allergic to, so he never ate the food he made in this mansion.",
  },
];

const evaluationPrompt = (setup, solution, userInput) => `
  You are an AI assisting in a puzzle game. 
  you speaks in a calm, thoughtful manner, often using metaphors.

  The current puzzle for the player to guess is: ${setup}
  The answer is: ${solution}
  
  You should respond to the player’s guesses with only "yes", "no", or "doesn't relate".
  If the player ask something unrelated to the puzzle say "doesn't relate"
  If the player answers correctly say: That's Correct!  

  Allow misspellings.
  Be a easy judge on the player's answer.

  player's current guess is: ${userInput}
`;

// ---------- DENO ---------- //
// ---------- DENO ---------- //
// ---------- DENO ---------- //
// ---------- DENO ---------- //
// ---------- DENO ---------- //

const evaEnding =
  "\nPress 'Ready to Guess' button to enter your final answer!\n";

main();

async function main() {
  // Greet the player
  this.echo("Hello, Player!");
  this.echo(dedent`
    Look at the scenario presented and try to find context clues, you can ask me question related to the scenario, however, I will only answer Yes No or Doesn't relate.
    
    Ask any question related to the scenario:

    `);

  // loop through all puzzles
  for (const puzzle of puzzles) {
    await playPuzzle(puzzle);

    // play again?
    this.echo("");
    const shouldContinue = await Confirm.prompt(
      "Do you want to continue with the next question? (yes/no)\n>",
    );
    if (!shouldContinue) {
      this.echo("Goodbye!");
      Deno.exit(0);
    }
  }

  this.echo("You've completed all the puzzles. Great job!");
  this.echo("Goodbye!");
}

async function playPuzzle({ setup, solution }) {
  this.echo("");
  this.echo(setup);

  // main player QA loop
  while (true) {
    this.echo("");
    const userInput = await Input.prompt("");

    const prompt = evaluationPrompt(setup, solution, userInput);

    const aiResponse = await gptPrompt(prompt, { temperature: 0.7 });
    this.echo(dedent`
        """
        ${aiResponse}
        """
    `);

    // keep looping until they get the right answer
    if (aiResponse.trim() === "CORRECT ANSWER!") return;
  }
}

// ---------- DENO ---------- //
// ---------- DENO ---------- //
// ---------- DENO ---------- //
// ---------- DENO ---------- //
// ---------- DENO ---------- //

function toggleCommandDivVisibility() {
  const commandDiv = document.getElementById("commandDiv");
  if (showInputUI) {
    commandDiv.style.display = "block"; // Show the div
  } else {
    commandDiv.style.display = "none"; // Hide the div
  }
}

showInputUI = false;
toggleCommandDivVisibility();
