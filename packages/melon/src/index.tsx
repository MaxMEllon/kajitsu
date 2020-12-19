import { createServer, IncomingMessage, ServerResponse } from "http";
import { on } from "events";
import { readFile } from "fs"
import { promisify } from "util"
import { join } from "path"
import { createSuica } from "@kajitsu/suica";
import { pipe } from "@kajitsu/ichigo";
import { h, renderToString, createStyleContext, renderToStyleString } from "@kajitsu/lemon";
import { Html } from "./components/templates/html"

const readFileAsync = promisify(readFile)

const readAssets = (name: string): Promise<Buffer> => pipe(
  name,
  (n) => join(__dirname, 'assets', `${n}`),
  (p) => {console.log(p);return p},
  (p) => readFileAsync(p),
)

type RequestEventIterator = AsyncIterableIterator<
  [IncomingMessage, ServerResponse]
>;

const suica = createSuica()

suica.use(async (_ctx, req, _res, next) => {
  await next()
  console.log(req.method, req.url)
})

suica.get("/robots.txt", async (_ctx, _req, res) => {
  const robotsTxt = await readAssets('robots.txt')
  res.setHeader('Content-Type', 'text/plain')
  res.setHeader('Cache-Control', 'public, immutable, max-age=2592000')
  res.write(robotsTxt)
  res.end()
})

suica.get("/manifest.json", async (_ctx, _req, res) => {
  const robotsTxt = await readAssets('manifest.json')
  res.setHeader('Content-Type', 'application/manifest+json')
  res.setHeader('Cache-Control', 'public, immutable, max-age=2592000')
  res.write(robotsTxt)
  res.end()
})

for (const i of [72, 96, 128, 144, 152, 192, 384, 512]) {
  suica.get(`/icon-${i}x${i}.png`, async (_ctx, _req, res) => {
    const png = await readAssets(`icons/icon-${i}x${i}.png`)
    res.setHeader('Content-Type', 'image/png')
    res.setHeader('Cache-Control', 'public, immutable, max-age=2592000')
    res.write(png)
    res.end()
  })
}

suica.get("/favicon.ico", async (_ctx, _req, res) => {
  const ico = await readAssets('favicon.ico')
  res.setHeader('Content-Type', 'image/x-icon')
  res.setHeader('Cache-Control', 'public, immutable, max-age=2592000')
  res.write(ico);
  res.end();
})

suica.get("/main.css", async (_ctx, _req, res) => {
  const css = await Promise.all([readAssets('css/reset.css'), readAssets('css/theme.css')]).then((v) => Buffer.concat(v));
  res.setHeader('Content-Type', 'text/css')
  res.setHeader('Cache-Control', 'public, immutable, max-age=2592000')
  res.write(css);
  res.end();
})

suica.get('/sw.js', async (_ctx, _req, res) => {
  const sw = await readAssets('sw.js')
  res.setHeader('Content-Type', 'application/javascript')
  res.setHeader('Cache-Control', 'public, immutable, max-age=2592000')
  res.write(sw);
  res.end();
})

suica.get('/register.js', async (_ctx, _req, res) => {
  const sw = await readAssets('register.js')
  res.setHeader('Content-Type', 'application/javascript')
  res.setHeader('Cache-Control', 'public, immutable, max-age=2592000')
  res.write(sw);
  res.end();
})

suica.get("/blog", async (_ctx, _req, res) => {
  const Blog = await import('./pages/blog').then(r => r.Blog)
  const styleCtx = createStyleContext().set()
  const body = renderToString(<Blog />)
  const style = renderToStyleString(styleCtx)
  const html = renderToString(<Html style={style}>{body}</Html>)
  styleCtx.remove()

  res.setHeader('Content-Type', 'text/html')
  res.setHeader('Cache-Control', `public, max-age=${60 * 60}`)
  res.write(`<!DOCTYPE html>${html}`)
  res.end();
});

suica.use("/", async (_ctx, _req, res) => {
  const Index = await import('./pages').then(r => r.Index)
  const styleCtx = createStyleContext().set()
  const body = renderToString(<Index />)
  const style = renderToStyleString(styleCtx)
  const html = renderToString(<Html style={style}>{body}</Html>)
  styleCtx.remove()

  res.setHeader('Content-Type', 'text/html')
  res.setHeader('Cache-Control', `public, max-age=${60 * 60}`)
  res.write(`<!DOCTYPE html>${html}`)
  res.end();
});

// TODO: https://github.com/microsoft/TypeScript/pull/37424
!(async () => {
  const itr: RequestEventIterator = on(createServer().listen(3000), "request");
  for await (const [req, res] of itr) //
    suica.run(req, res);
})();
