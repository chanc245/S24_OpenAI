// ---------- TERMINAL ---------- //
// ---------- TERMINAL ---------- //
// ---------- TERMINAL ---------- //
// ---------- TERMINAL ---------- //
// ---------- TERMINAL ---------- //

let term;

$(document).ready(function () {
  term = $("#commandDiv").terminal(function () {
  }, {
    greetings: `Welcome to terminal`,
    prompt: " ",
  });
});

// ---------- AI ---------- //
// ---------- AI ---------- //
// ---------- AI ---------- //
// ---------- AI ---------- //
// ---------- AI ---------- //

async function requestAI(input) {
  const response = await fetch("/aiRequest", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ input: input }),
  });

  if (response.ok) {
    const jsonData = await response.json();
    console.log(jsonData.ai);
    return jsonData.ai;
  } else {
    console.error("Error in submitting data.");
    return "Error in submitting data.";
  }
}
