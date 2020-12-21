import { IncomingMessage, ServerResponse } from "http";
import url from "url";

export * as middleware from "./middleware";

declare global {
  namespace Suica {
    export interface Context {}
  }
}

export interface RequestHandler {
  (
    ctx: Suica.Context,
    req: IncomingMessage,
    res: ServerResponse,
    next: (err?: Error) => Promise<void>
  ): Promise<void>;
}

interface SuicaMiddlwareRegisterWithPath {
  (path: string | RegExp, handler: RequestHandler): void;
}

interface SuicaMiddlewareRegisterAll {
  (handler: RequestHandler): void;
}

interface SuicaMiddlewareRegister {
  (path: string | RegExp, handler: RequestHandler): void;
  (handler: RequestHandler): void;
}

class App {
  readonly use: SuicaMiddlewareRegister;
  readonly get: SuicaMiddlwareRegisterWithPath;
  private routing: Array<[string | RegExp, RequestHandler]> = [];

  constructor() {
    this.use = (...args: any[]) => {
      if (args.length >= 3) throw new Error("arguments error");
      if (args.length == 2) {
        this.routing.push([args[0], args[1]]);
        return;
      }
      this.routing.push(["", args[0]]);
    };

    this.get = (path: string | RegExp, middleware: RequestHandler) => {
      const enhancedMiddleware: RequestHandler = async (ctx, req, res, next) => {
        if (req.method !== "GET") {
          res.statusCode = 404;
          res.end()
          return
        }
        await middleware(ctx, req, res, next)
      }
      this.routing.push([path, enhancedMiddleware])
    }
  }

  async run(req: IncomingMessage, res: ServerResponse): Promise<void> {
    let idx = 0;
    let ctx: Suica.Context = {};
    while (idx < this.routing.length) {
      const next = async () => void idx++;
      const [pathOrRegExp, handler] = this.routing[idx];
      const currentPath = url.parse(req.url || "/").pathname;

      const isMatch =
        typeof pathOrRegExp === "string"
          ? currentPath === pathOrRegExp
          : pathOrRegExp.test(currentPath ?? "");

      if (isMatch) {
        const prevIdx = idx;
        await handler(ctx, req, res, next);
        if (prevIdx === idx) break;
      } else {
        idx++;
      }
    }
    if (!res.writableEnded) {
      res.write("");
      res.end();
    }
  }
}

export function createSuica(): App {
  return new App();
}
