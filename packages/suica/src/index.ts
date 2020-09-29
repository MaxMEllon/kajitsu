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
    next: (err?: Error) => void
  ): void;
}

interface SuicaMiddleware {
  (path: string | RegExp, handler: RequestHandler): void;
  (handler: RequestHandler): void;
}

class App {
  readonly use: SuicaMiddleware;
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
  }

  run(req: IncomingMessage, res: ServerResponse): void {
    let idx = 0;
    let ctx: Suica.Context = {};
    console.log(this.routing);
    while (idx < this.routing.length) {
      const next = () => idx++;
      const [pathOrRegExp, handler] = this.routing[idx];
      const currentPath = url.parse(req.url || "/").pathname;
      const isMatch =
        typeof pathOrRegExp === "string"
          ? currentPath?.includes(pathOrRegExp)
          : pathOrRegExp.test(currentPath ?? "");
      console.table({
        currentPath,
        pathOrRegExp,
        isMatch,
        handler,
      });
      if (isMatch) {
        const prevIdx = idx;
        handler(ctx, req, res, next);
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
