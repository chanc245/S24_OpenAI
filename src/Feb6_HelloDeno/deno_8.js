/**
 * 8. Make a program that takes the temperature in Fahrenheit and then outputs “cold”, “warm”, or “hot”.
 **/
function determinWeather(){
  // cold: >32 
  // warm: anything in between
  // hot: <77
  // this is completely my personal option!
  const tempFah = prompt("Enter temperature in Fahrenheit: ");

  if (tempFah <= 32){
    console.log(`${tempFah}F is consider cold`)
  } else if (tempFah > 32 && tempFah <= 77){
    console.log(`${tempFah}F is consider warm`)
  } else {
    console.log(`${tempFah}F is consider hot`)
  }
}

determinWeather()