console.log("Hello, font end!");

async function main() {
  const response = await fetch(`/api/random`);
  const responseText = await response.text();
  const randomNumberSpan = document.getElementById("random-number");
  randomNumberSpan.textContent = responseText;
}

async function nonsense() {
  const response = await fetch(`/api/nonsense`);
  const responseText = await response.text();
  const randomNumberSpan = document.getElementById("nonsense");
  randomNumberSpan.textContent = responseText;
}

main();
nonsense();
