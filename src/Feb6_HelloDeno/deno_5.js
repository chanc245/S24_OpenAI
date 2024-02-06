/**
 * 5. Make a program that prints out a random number between 1 and 6 (inclusive)
 */
// function random_1and6_ONE() {
//   // More complicated way --> ChatGPT (I forgot how math.random works)
//   function getRandomInt(min, max) {
//     min = Math.ceil(min);
//     max = Math.floor(max);
//     return Math.floor(Math.random() * (max - min + 1)) + min;
// }
//   const randomNumber = getRandomInt(1, 6);
//   console.log(randomNumber);
// }

function random_1and6_TWO() {
  // Easiest way
  const randomNumber = Math.floor(Math.random() * 6) + 1;
  console.log(randomNumber);
}

// random_1and6_ONE()
random_1and6_TWO()
