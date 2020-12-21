import { createServer, IncomingMessage, ServerResponse } from "http";
import { on } from "events";
import { readFile } from "fs"
import { promisify } from "util"
import { join } from "path"
import { createSuica } from "@kajitsu/suica";
import { pipe } from "@kajitsu/ichigo";
import { h, Fragment, renderToString, createStyleContext, renderToStyleString } from "@kajitsu/lemon";
import { Html } from "./components/templates/html"
import { articles } from "./pages/blog/articles"

const readFileAsync = promisify(readFile)

const readAssets = (name: string): Promise<Buffer> => pipe(
  name,
  (n) => join(__dirname, 'assets', `${n}`),
  (p) => readFileAsync(p),
)

type RequestEventIterator = AsyncIterableIterator<
  [IncomingMessage, ServerResponse]
>;

const suica = createSuica()

if (process.env.NODE_ENV !== 'production') {
  suica.use(async (_ctx, req, _res, next) => {
    console.log(req.method, req.url)
    await next()
  })
}

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

suica.get("/markdown.css", async (_ctx, _req, res) => {
  const css = await readAssets('css/markdown.css')
  res.setHeader('Content-Type', 'text/css')
  res.setHeader('Cache-Control', 'public, immutable, max-age=2592000')
  res.write(css);
  res.end();
})

suica.get("/main.css", async (_ctx, _req, res) => {
  const css = await Promise.all([readAssets('css/reset.css'), readAssets('css/theme.css')]).then((v) => Buffer.concat(v));
  res.setHeader('Content-Type', 'text/css')
  res.setHeader('Cache-Control', 'public, immutable, max-age=2592000')
  res.write(css);
  res.end();
})

suica.get('/sw.20c18a66c331ba17e029ce0818cd3fff.js', async (_ctx, _req, res) => {
  const sw = await readAssets('sw.js')
  res.setHeader('Content-Type', 'application/javascript')
  res.setHeader('Cache-Control', 'public, immutable, max-age=2592000')
  res.write(sw);
  res.end();
})

suica.get('/register.js', async (_ctx, _req, res) => {
  const sw = await readAssets('register.js')
  res.setHeader('Content-Type', 'application/javascript')
  res.setHeader('Cache-Control', 'privatte, no-store, must-revalidate')
  res.write(sw);
  res.end();
})

for (const [_, list] of Object.entries(articles)) {
  list.forEach(article => {
    suica.get(`/blog/${article.key}`, async (_ctx, _req, res) => {
      const styleCtx = createStyleContext().set()
      const body = renderToString(await article.renderer())
      const style = renderToStyleString(styleCtx)
      const extendsHead = (
        <>
          <link rel="stylesheet" href="/markdown.css" />
          {await article.extendsHeader()}
        </>
      )
      const html = renderToString(<Html extendsHead={extendsHead} style={style}>{body}</Html>)
      styleCtx.remove()

      res.setHeader('Content-Type', 'text/html')
      res.setHeader('Cache-Control', `public, max-age=${60 * 60}`)
      res.write(`<!DOCTYPE html>${html}`)
      res.end();
    });
  })
}

suica.get("/", async (_ctx, _req, res) => {
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

// TODO: https://github.com/microsoft/TypeScript/pull/37424
!(async () => {
  const itr: RequestEventIterator = on(createServer().listen(3000), "request");
  for await (const [req, res] of itr) //
    suica.run(req, res);
})();
