/**
 * 6. Make a program that prints either your first name or your last name, chosen at random.
 **/
function randomPrintName() {
  // code copy from deno_5
  const randomNum = Math.floor(Math.random() * 2) + 1;
  if (randomNum == 1){
    console.log("Chris")
  } else {
    console.log("Chang")
  }
}

randomPrintName()