/**
 * This program where chatGPT play lateral thinking puzzles with you.
 */

import { gptPrompt } from "../shared/openai.js";
import { ask, say } from "../shared/cli.js";

main();

async function main() {
  let playing = true;
  const questionList = [
    "\nA man walks into a bar and asks the bartender for a glass of water. The bartender pulls out a gun and points it at the man. The man says, “Thank you” and walks out.",
    "\nTwo piece of rock, a carrot, and a scarf are lying on the lawn. Nobody put them on the lawn but there is a perfectly logical reason why they should be there. What is it?",
    "\nA man pushes his car until he reaches a hotel. When he arrives, he realizes he’s bankrupt. What happened?",
  ];
  const answerList = [
    "The man had hiccups and the gun scared them out of him, to which he said, “Thank you.”",
    "A snowman was built in the yard, and the snow has since melted, leaving the eyes, nose, mouth, and scarf on the ground.",
    "He’s playing Monopoly and his piece is the car. He lands on a space with a hotel and doesn’t have the money to pay the fee.",
  ];
  const playingNum = 0;

  say("Hello, Player!");

  say( //explain the game
    "\nLook at the scenario presented and try to find context clues, you can ask me question related to the scenario, however, I will only answer Yes No or Doesn't relate.",
    "\nAsk any question realted to the scenario:",
  );

  say( //question
    questionList[playingNum],
  );

  while (playing && playingNum < questionList.length) {
    const guess = await ask("\n>");

    if (guess == "quit") {
      playing = false;
    }

    const prompt = `You are an AI assisting in a puzzle game. 
    you speaks in a calm, thoughtful manner, often using metaphors.

    The current puzzle for the player to guess is: ${questionList[playingNum]}
    The answer is: ${answerList[playingNum]}
    
    You should respond to the player’s guesses with only "yes", "no", or "doesn\'t relate".
    If the player ask something unrelated to the puzzle say "doesn\'t relate"
    If the player answer correctly say: CORRECT ANSWER!  


    Allow misspellings.
    Be a easy judge on the player's answer.
    
    player's current guess is: ${guess}
    `;

    const Guess = await gptPrompt(prompt, { temperature: 0.7 });
    say(`
    """
    \n${Guess}\n
    """`);

    if (Guess.trim() === "CORRECT ANSWER!") {
      if (playingNum + 1 < questionList.length) {
        const continueGame = await ask(
          "Do you want to continue with the next question? (yes/no)\n>",
        );
        if (continueGame.toLowerCase() === "yes") {
          playingNum += 1;
          say( //question
            questionList[playingNum],
          );
        } else {
          playing = false;
        }
      } else {
        say("You've completed all the puzzles. Great job!");
        playing = false;
      }
    }
  }
}
