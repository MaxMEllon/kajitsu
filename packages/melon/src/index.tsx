import { createServer, IncomingMessage, ServerResponse } from "http";
import { on } from "events";
import { readFile } from "fs"
import { promisify } from "util"
import { join  } from "path"
import { createSuica } from "@kajitsu/suica";
import { h, renderToString, createStyleContext, renderToStyleString } from "@kajitsu/lemon";
import { Blog } from "./pages/blog"
import { Html } from "./components/templates/html"

const readFileAsync = promisify(readFile)

type RequestEventIterator = AsyncIterableIterator<
  [IncomingMessage, ServerResponse]
>;

const suica = createSuica();

suica.use("/main.css", async (_ctx, _req, res) => {
  const resetCss = await readFileAsync(join(__dirname, 'css', 'reset.css'))
  const themeCss = await readFileAsync(join(__dirname, 'css', 'theme.css'))
  const css = Buffer.concat([resetCss, themeCss])

  res.setHeader('Content-Type', 'text/css')
  res.setHeader('Cache-Control', 'public, immutable, max-age=2592000')
  // We able to cache by gzip, br or deflate if used CDN with vary header.
  // res.setHeader('Vary', 'Accept-Encoding')
  res.write(css);
  res.end();
})

suica.get("/blog", async (_ctx, _req, res) => {
  const styleCtx = createStyleContext().set()
  const body = renderToString(<Blog />)
  const style = renderToStyleString(styleCtx)
  const html = renderToString(<Html style={style}>{body}</Html>)

  res.setHeader('Content-Type', 'text/html')
  res.setHeader('Cache-Control', `public, max-age=${60 * 60}`)
  res.write(html)
  res.end();
});

suica.use("/", async (_ctx, _req, res) => {
  res.end();
});

// TODO: https://github.com/microsoft/TypeScript/pull/37424
!(async () => {
  const itr: RequestEventIterator = on(createServer().listen(3000), "request");
  for await (const [req, res] of itr) //
    suica.run(req, res);
})();
