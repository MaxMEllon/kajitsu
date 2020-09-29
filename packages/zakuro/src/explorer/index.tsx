import { createServer, IncomingMessage, ServerResponse } from "http";
import { on } from "events";
import { createSuica, middleware } from "@kajitsu/suica";
import { h, renderToString, renderToStyleString } from "@kajitsu/lemon";
import { atomsStories } from "./import";

type RequestEventIterator = AsyncIterableIterator<
  [IncomingMessage, ServerResponse]
>;

const suica = createSuica();

suica.use(middleware.bodyParser.json);
atomsStories.map((scenario) => {
  suica.use(`/${scenario.key}`, (_ctx, _req, res) => {
    const { Wrapper } = require("./wrapper");
    const style = renderToStyleString();
    const html = renderToString(<Wrapper style={style}>{scenario.story()}</Wrapper>
    );
    res.write(html);
    res.end();
  });
});

suica.use("/", (_ctx, req, res, next) => {
  if (req.method !== "GET") return next();
  const { Root } = require("./root");
  const style = renderToStyleString();
  const html = renderToString(<Root style={style} />);
  res.write(html);
  res.end();
  delete require.cache[require.resolve("./root")];
});
// TODO: https://github.com/microsoft/TypeScript/pull/37424
!(async () => {
  const itr: RequestEventIterator = on(createServer().listen(6789), "request");
  for await (const [req, res] of itr) //
    suica.run(req, res);
})();
