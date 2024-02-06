/**
 * 9. Make a program that asks three multiple choice questions, and then tells the user how many they got right.
 **/
import { gptPrompt } from "./openai.js";

console.log("Hi! You will be asks three multiple choice questions, and then we will tell you how many you got right.");

const ans1 = prompt(`
Please answer mutiple choice questions 1 in numbers. [example response: 2]
Question 1: What is the color of apple 
1) red 
2) blue
3) purple
4) rainbow
`);

const ans2 = prompt(`
Please answer mutiple choice questions 2 in numbers. [example response: 2]
Question 2: How many colors are in rainbow?
1) 5 
2) 7
3) 10
4) 11
`);

const ans3 = prompt(`
Please answer mutiple choice questions 3 in numbers. [example response: 2]
Question 3: Which of the following is NOT a fruit?
1) Rhubarb 
2) Tomatoes
3) Avocados
`);

const result = await gptPrompt(`
Question 1: What is the color of apple 
mutile choices: 
1) red, 
2) blue,
3) green,
4) rainbow
Is the user's answer: "${ans1}"? to question 1 correct?

Question 2: How many colors are in rainbow?
1) 5 
2) 7
3) 10
4) 11
Is the user's answer: "${ans2}"? to question 2 correct?

Question 3: Which of the following is NOT a fruit?
1) Rhubarb 
2) Tomatoes
3) Avocados
Is the user's answer: "${ans3}"? to question 3 correct?

Please conclude how many the user answer correctly.
Please answer in "Questoin 1 is correct" or "Question 1 is wrong".
  `,
);

console.log(`\n${result}`);

// struggles I’ve been through: terminal need me to grant the access to different files —> solve by chatGPT
