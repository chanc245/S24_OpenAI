import { loadEnv } from "../../shared/util.ts";
import { Application, Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { createExitSignal, staticServer } from "../../shared/server.ts";
import { gptPrompt } from "../../shared/openai.js";

Deno.chdir(new URL(".", import.meta.url).pathname);
console.log(`Current working directory: ${Deno.cwd()}`);
const env = loadEnv();
if (!env.OPENAI_API_KEY) log.warn("No OPENAI_API_KEY in .env file");

const app = new Application();
const router = new Router();

router.post("/aiRequest", async (ctx) => {
  console.log("--START /aiRequest");
  try {
    const body = ctx.request.body();
    let data = await body.value;
    let askPrompt = data.input;

    const result = await gptPrompt(askPrompt, {
      temperature: 0.7,
      max_tokens: 150,
    });

    ctx.response.status = 200; // OK
    ctx.response.body = { ai: result };
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

console.log(`\nListening on http://localhost:${env.PORT || 8000}`);
await app.listen({ port: env.PORT || 8000, signal: createExitSignal() });
