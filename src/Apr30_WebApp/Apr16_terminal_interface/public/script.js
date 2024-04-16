// ---------- TERMINAL ---------- //
// ---------- TERMINAL ---------- //
// ---------- TERMINAL ---------- //
// ---------- TERMINAL ---------- //
// ---------- TERMINAL ---------- //

$("#commandDiv").terminal({
  start: async function () {
    this.echo("--requestGPT()");
    console.log("--requestGPT()");
    requestGPT();
  },
}, {
  greetings: `Hello!!!
  `,
});

async function requestGPT() {
  console.log(`--requestGPT started --input:`);

  const prompt = "Say this is a test";

  const response = await fetch("/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ input: prompt }), // Corrected here
  });

  if (response.ok) {
    console.log("--GPT response OK");
    const jsonData = await response.json();
    const gptResponse = jsonData.gpt; // Assuming the backend returns the GPT response under a "gpt" key
    console.log(gptResponse);
    return gptResponse;
  } else {
    console.error("Error in submitting data.");
    return "Error in submitting data.";
  }
}
