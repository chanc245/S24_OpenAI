import { Application, Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";

import { createExitSignal, staticServer } from "../../shared/server.ts";
// createExitSignal --> listen for control c --> sends a signal to turn off the server.

import { gptPrompt } from "../../shared/openai.js";

Deno.chdir(new URL(".", import.meta.url).pathname);
console.log(`Current working directory: ${Deno.cwd()}`);

//API routes (library definition)
const app = new Application();
const router = new Router();

//following check for specific router
router.get("/api/test", (ctx) => {
  ctx.response.body = "Hello World!";
});
// ctx: context

router.get("/api/random", (ctx) => {
  ctx.response.body = Math.random();
});

router.get("/api/hello", (ctx) => {
  ctx.response.body = `
  <html>
    <head><title></title></head>
      <body>
        <h1>Hello, World!!</h1>
      </body>
  </html>
  `;
});
// not very efficient, not a good place to edit this

router.get("/api/nonsense", async (ctx) => {
  const result = await gptPrompt(
    `make us a nonsense stentence that looks right but doesnt mean anything`,
  );
  ctx.response.body = result;
});

app.use(router.routes());
app.use(router.allowedMethods());
app.use(staticServer); //look for anything in the for the name and public it

console.log("Listening on http://localhost:8000");

await app.listen({ port: 8000, signal: createExitSignal() });
// when call "listen" it starts to listen forever,
//  so we need createExitSignal to tell it when to stop
