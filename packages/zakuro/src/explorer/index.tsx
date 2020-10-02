import { createServer, IncomingMessage, ServerResponse } from "http";
import { on } from "events";
import { createSuica, middleware } from "@kajitsu/suica";
import {
  h,
  refreshStyleCache,
  renderToString,
  renderToStyleString,
} from "@kajitsu/lemon";
import { atomsStories } from "./import";
import { globalStyle } from "./globalStyle";
import { Root } from "./root";

type RequestEventIterator = AsyncIterableIterator<
  [IncomingMessage, ServerResponse]
>;

const suica = createSuica();

const template = ({ style, children }: { style: string; children: string }) => `
  <html>
    <head>
      <meta charset="UTF-8" />
      ${style}
      <style>${globalStyle}</style>
    </head>
    <body>
      ${children}
    </body>
  </html>
`;

suica.use(middleware.bodyParser.json);
atomsStories.map((scenario) => {
  suica.use(`/${scenario.key}`, (_ctx, _req, res) => {
    refreshStyleCache();
    const children = renderToString(scenario.story());
    const style = renderToStyleString();
    res.write(template({ style, children }));
    res.end();
  });
});

suica.use("/", (_ctx, req, res, next) => {
  if (req.method !== "GET") return next();
  refreshStyleCache();
  const root = renderToString(<Root />);
  const style = renderToStyleString();
  res.write(template({ children: root, style }));
  res.end();
});

// TODO: https://github.com/microsoft/TypeScript/pull/37424
!(async () => {
  const itr: RequestEventIterator = on(createServer().listen(6789), "request");
  for await (const [req, res] of itr) //
    suica.run(req, res);
})();
