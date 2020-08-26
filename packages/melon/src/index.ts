import { createServer, IncomingMessage, ServerResponse } from "http";
import { on } from "events";
import { createSuica } from "@kajitsu/suica";
import { readBodyAsJSON } from "./utils/read-body";

type RequestEventIterator = AsyncIterableIterator<
  [IncomingMessage, ServerResponse]
>;

const suica = createSuica();

suica.use(async (req, res, _) => {
  const body = await readBodyAsJSON(req);
  res.write(JSON.stringify(body));
  res.end();
});

// TODO: https://github.com/microsoft/TypeScript/pull/37424
!(async () => {
  const itr: RequestEventIterator = on(createServer().listen(3000), "request");
  for await (const [req, res] of itr) //
    suica.run(req, res);
})();
