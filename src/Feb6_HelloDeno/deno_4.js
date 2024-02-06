/**
 * 4. Make a program that asks the user for two numbers and then prints their sum.
 */
function sumTwoNum() {
  const NumInput1 = prompt("Please give a number: ");
  const NumInput2 = prompt("Please give a second number: ");
  const sum = Number(NumInput1) + Number(NumInput2)
  console.log(`The sum of ${NumInput1} and ${NumInput2} is: ${sum}`);
}

sumTwoNum()