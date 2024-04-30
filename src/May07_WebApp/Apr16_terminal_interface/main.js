// deno run -A main.js

console.log(";lasdjf");

import { Application, Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { createExitSignal, staticServer } from "../../shared/server.ts";
import { gptPrompt } from "../../shared/openai.js";

Deno.chdir(new URL(".", import.meta.url).pathname);
console.log(`Current working directory: ${Deno.cwd()}`);

const app = new Application();
const router = new Router();

router
  .get("/", (context) => context.response.redirect("/public/index.html"))
  .post("/submit", async (context) => {
    try {
      const { input } = await context.request.body().value;
      const gptResponse = await gptPrompt(input);
      context.response.body = { gpt: gptResponse };
    } catch (error) {
      console.error("Error:", error);
      context.response.status = 500;
      context.response.body = {
        error: "Failed to generate output. Please try again.",
      };
    }
  });

app.use(router.routes());
app.use(router.allowedMethods());
app.use(staticServer);

console.log("Listening on http://localhost:8000");

await app.listen({ port: 8000, signal: createExitSignal() });
