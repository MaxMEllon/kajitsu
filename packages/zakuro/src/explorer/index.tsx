import { createServer, IncomingMessage, ServerResponse } from "http";
import { on } from "events";
import { readFile } from "fs";
import { resolve } from "path";
import { promisify } from "util";
import { createSuica } from "@kajitsu/suica";
import {
  FC,
  h,
  renderToString,
  renderToStyleString,
  createStyleContext,
} from "@kajitsu/lemon";
import { atomsStories } from "./import";
import { Root } from "./root";

type RequestEventIterator = AsyncIterableIterator<
  [IncomingMessage, ServerResponse]
>;

const readFileAsync = promisify(readFile);

const suica = createSuica();

const Html: FC<{ css?: string }> = ({ children, css }) => (
  <html lang="ja">
    <head>
      <meta charset="UTF-8" />
      <link rel="stylesheet" href="/assets/index.css"></link>
      <link rel="stylesheet" href="/assets/explorer.css"></link>
      {typeof css === "string" && <style>{css}</style>}
    </head>
    <body>{children}</body>
    <script async src="/assets/index.js"></script>
  </html>
);

atomsStories.map((scenario) => {
  suica.use(`/${scenario.key}`, async (_ctx, _req, res) => {
    const styleContext = createStyleContext().set();
    const children = renderToString(scenario.story());
    const css = renderToStyleString(styleContext);
    res.write(renderToString(<Html css={css}>{children}</Html>));
    res.end();
  });
});

suica.use("/assets/index.js", async (_ctx, req, res, next) => {
  if (req.method !== "GET") return await next();
  const js = await readFileAsync(resolve(__dirname, "assets", "index.js"));
  res.setHeader("Content-Type", "text/javascript");
  res.write(js);
  res.end();
});

suica.use("/assets/index.css", async (_ctx, req, res, next) => {
  if (req.method !== "GET") return await next();
  const css = await readFileAsync(resolve(__dirname, "assets", "index.css"));
  res.setHeader("Content-Type", "text/css");
  res.write(css);
  res.end();
});

const styleContext = createStyleContext().set();
const root = renderToString(<Root />);
const style = renderToStyleString(styleContext);

suica.use("/assets/explorer.css", async (_ctx, req, res, next) => {
  if (req.method !== "GET") return await next();
  res.setHeader("Content-Type", "text/css");
  res.write(style);
  res.end();
});

suica.use("/", async (_ctx, req, res, next) => {
  if (req.method !== "GET") return await next();
  res.write(renderToString(<Html>{root}</Html>));
  res.end();
});

// TODO: https://github.com/microsoft/TypeScript/pull/37424
!(async () => {
  const itr: RequestEventIterator = on(createServer().listen(6789), "request");
  for await (const [req, res] of itr) //
    await suica.run(req, res);
})();
