import { createServer, IncomingMessage, ServerResponse } from "http";
import { on } from "events";
import { createSuica, middleware } from "@kajitsu/suica";

type RequestEventIterator = AsyncIterableIterator<
  [IncomingMessage, ServerResponse]
>;

const suica = createSuica();

suica.use(middleware.bodyParser.json);
suica.use("/", async (ctx, _req, res) => {
  res.write(JSON.stringify(ctx.body));
  res.end();
});

// TODO: https://github.com/microsoft/TypeScript/pull/37424
!(async () => {
  const itr: RequestEventIterator = on(createServer().listen(3000), "request");
  for await (const [req, res] of itr) //
    suica.run(req, res);
})();
