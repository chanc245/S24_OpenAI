/**
 * Terminal App: Code Assistant
 * Terminal Code Assistant - Improve Readability, Efficiency, and Maintainability
 *
 * Code Assistant that can help the user with the followings:
 * 1. Judge
 *    - Readability (Ordering & Formatting)
 *    - Variable Naming (Clarity & Consistency)
 *    - Conciseness (Efficiency & Optimization)
 * 2. Helper
 *    - Code Style (Enhance Readability)
 *    - Variable Naming (Suggest Better Names)
 *    - Conciseness (Refactor for Efficiency)
 * 3. Troubleshooter
 *    - Identify & Explain Code Errors
 * 4. Overall Feedback
 *    - from previous code -- give score or short feedback (able to decide style)
 */

import { gptPrompt } from "../shared/openai.js";
import { ask, say } from "../shared/cli.js";

import boxen from "boxen";
import { Confirm } from "https://deno.land/x/cliffy@v1.0.0-rc.3/prompt/mod.ts";

// ----------MAIN LOOP---------- //
// ----------MAIN LOOP---------- //
// ----------MAIN LOOP---------- //
// ----------MAIN LOOP---------- //
// ----------MAIN LOOP---------- //

async function main() {
  say("");
  say(
    boxen(
      `Welcome! This is a terminal App where you can input your code, 
      and I will provide services around your code`,
      {
        padding: 1,
        title: "HELLO CODER",
        titleAlignment: "center",
        borderStyle: "bold",
      },
    ),
  );

  const userInputCode = await ask("\nPlease input your code:");

  let continueService = true;

  while (continueService) {
    say("");
    say(boxen(
      `\n1. Judge (give your code a score)
        \n2. Helper (improve on coding)
        \n3. Troubleshooter (explain why your code is not working)
        \n4. Overall feedback (one sentence feedback and a brief score)
        \n5. Exit (Finish and exit the app)`,
      {
        padding: 1,
        title: "How would you like your service today?",
        titleAlignment: "center",
      },
    ));
    const action = await ask(
      `Please enter a number:`,
    );

    switch (action) {
      case "1": {
        await judgeCode(userInputCode);
        const improveCode = await Confirm.prompt(
          "\nAfter the scores, would you like a code helper to help you improve your code? (yes/no)",
        );
        if (improveCode) {
          await helpCode(userInputCode);
        }
        break;
      }
      case "2":
        await helpCode(userInputCode);
        break;
      case "3":
        await troubleCode(userInputCode);
        break;
      case "4":
        await feedback(userInputCode);
        break;
      case "5":
        continueService = false;
        say(
          "\nThank you for interacting with this terminal app! Happy coding!",
        );
        break;
      default:
        say("\nInvalid option, please try again.");
    }

    if (action !== "5") {
      const continueChoice = await Confirm.prompt(
        "\nWould you like to continue using another service? (yes/no)",
      );
      continueService = continueChoice;
    }
  }

  if (!continueService) {
    say(
      "\nThank you for interacting with this terminal app! Happy coding!",
    );
  }
}

// ----------JUDGE---------- //
// ----------JUDGE---------- //
// ----------JUDGE---------- //
// ----------JUDGE---------- //
// ----------JUDGE---------- //

async function judgeCode(userInputCode) {
  const readPrompt = `
    Assess the readability of this code on a scale of 1 to 10, where 1 is hard to read and 10 is easy to read.
    Code snippet:
    ${userInputCode}

    NUMBERS ONLY, (for example: 5/10), do NOT provide word explination
    Your response should be a single number between 1 and 10.
  `;
  const readScore = await gptPrompt(readPrompt, { temperature: 0.7 });

  const namePrompt = `
    Evaluate the clarity of variable names in this code on a scale of 1 to 10, where 1 means names are unclear or misleading, and 10 means names are clear and descriptive.
    Code snippet:
    ${userInputCode}

    NUMBERS ONLY, (for example: 5/10), do NOT provide word explination
    Your response should be a single number between 1 and 10.
  `;
  const nameScore = await gptPrompt(namePrompt, { temperature: 0.7 });

  const concisePrompt = `
    Rate the conciseness of this code on a scale of 1 to 10, where 1 means the code is in unnecessary complexity, and 10 means the code is concise, efficient and with easy readability.
    Code snippet:
    ${userInputCode}

    NUMBERS ONLY, (for example: 5/10), do NOT provide word explination
    Your response should be a single number between 1 and 10.
  `;
  const conciseScore = await gptPrompt(concisePrompt, {
    temperature: 0.7,
    max_tokens: 5,
  });

  say("");
  say(
    boxen(
      `\nReadability score: ${readScore}
      \nVariable naming score: ${nameScore}
      \nConciseness score: ${conciseScore}`,
      {
        padding: 1,
        title: "SCORE RESULT",
        titleAlignment: "center",
      },
    ),
  );

  // say(`\nReadability score: ${readScore}`);
  // say(`Variable naming score: ${nameScore}`);
  // say(`Variable naming score: ${nameScore}`);
}

// ----------HELP---------- //
// ----------HELP---------- //
// ----------HELP---------- //
// ----------HELP---------- //
// ----------HELP---------- //

async function helpCode(userInputCode) {
  say("");
  say(
    boxen(
      `\n1. Style (improve readability)
      \n2. Naming (improve variable naming)
      \n3. Conciseness (make your code more concise)`,
      {
        padding: 1,
        title: "What kind of help?",
        titleAlignment: "center",
      },
    ),
  );
  const helpAspect = await ask(
    `\nPlease enter a number:`,
  );

  let prompt;

  switch (helpAspect) {
    case "1": // Improve Style
      prompt = `
        Given this code snippet, suggest a small change to improve readability without altering the functionality. Keep the suggestion concise and focused on style improvements.
        
        Code snippet:
        ${userInputCode}
        
        Suggestion:
      `;
      break;
    case "2": // Improve Naming
      prompt = `
        Review the variable names in the following code snippet and suggest a better naming convention that could enhance clarity and descriptiveness. Provide a specific example based on the code.
        
        Code snippet:
        ${userInputCode}
        
        Suggested naming example:
      `;
      break;
    case "3": // Make More Concise
      prompt = `
        Identify a part of this code snippet that could be made more concise without losing readability or functionality. Provide a rewritten, more concise version of that part.
        
        Code snippet:
        ${userInputCode}
        
        Concise version:
      `;
      break;
    default:
      say("\nInvalid option.");
      return;
  }

  const suggestion = await gptPrompt(prompt, { temperature: 0.5 });

  say(`\nSuggestion: ${suggestion}`);
}

// ----------TROUBLESHOOTING---------- //
// ----------TROUBLESHOOTING---------- //
// ----------TROUBLESHOOTING---------- //
// ----------TROUBLESHOOTING---------- //
// ----------TROUBLESHOOTING---------- //

async function troubleCode(userInputCode) {
  let hasQuestions = true;

  while (hasQuestions) {
    say("");
    say(boxen(
      `What issue are you experiencing with your code?`,
      {
        padding: 1,
      },
    ));
    const userQuestion = await ask(
      `\nType your question:`,
    );

    const troubleshootingPrompt = `
      Based on the following code snippet, provide a short suggestion or solution within a paragraph to the user's issue ${userQuestion}.
      
      Code snippet:
      ${userInputCode}
      
      Please make sure the suggestion or solution is short and concise, within 3 key points. 
    `;

    const suggestion = await gptPrompt(troubleshootingPrompt, {
      max_tokens: 512,
      temperature: 0.5,
    });
    say(`\nSuggestion: ${suggestion}`);

    const moreQuestions = await Confirm.prompt(
      "\nDo you have more questions about your code? (yes/no):",
    );
    hasQuestions = moreQuestions;
  }
}

// ----------FEEDBACK---------- //
// ----------FEEDBACK---------- //
// ----------FEEDBACK---------- //
// ----------FEEDBACK---------- //
// ----------FEEDBACK---------- //

async function feedback(userInputCode) {
  say("");
  say(boxen(
    `How harshly do you want your code judged?`,
    {
      padding: 1,
    },
  ));
  const judgmentLevel = await ask(
    `Enter a number from 1 (gentle) to 10 (harsh):`,
  );

  const prompt = `
    Please provide an overall score out of 10 for the clarity of variable names in this code snippet. 
    The judgment harshness level is ${judgmentLevel}.

    Code snippet:
    ${userInputCode}

    NUMBERS ONLY, (for example: 5/10), do NOT provide word explanation.
  `;

  const rawScore = await gptPrompt(prompt, { temperature: 0.7 });
  say(`\nYour code's variable naming score: ${rawScore}`);

  const feedbackInterest = await Confirm.prompt(
    "\nWould you like some feedback on how you name your variables? (yes/no):",
  );

  if (feedbackInterest) {
    const feedbackStyle = await ask(
      "\nWhat style of feedback would you like? (fun, lighthearted, etc.):",
    );

    const feedbackPrompt = `
      \nGiven the code snippet provided and considering the requested feedback style to be ${feedbackStyle}, 
      offer insights on the clarity and descriptiveness of the variable names. Provide constructive feedback in a ${feedbackStyle} manner.
      Respond in list.
      
      Code snippet:
      ${userInputCode}
    `;

    const feedback = await gptPrompt(feedbackPrompt, { temperature: 0.9 });
    say(`\nFeedback on your variable names: """\n${feedback}\n"""`);
  }
}

main();
