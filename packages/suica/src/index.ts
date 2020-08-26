import { IncomingMessage, ServerResponse } from "http";

interface RequestHandler {
  (
    req: IncomingMessage,
    res: ServerResponse,
    next: (err?: Error) => void
  ): void;
}

interface SuicaMiddleware {
  (path: string, handler: RequestHandler): void;
  (handler: RequestHandler): void;
}

class App {
  readonly use: SuicaMiddleware;
  private routing: Array<[string, RequestHandler]> = [];

  constructor() {
    this.use = (...args: any[]) => {
      if (args.length === 2) {
        if (typeof args[0] !== "string") {
          throw new Error("arguments error");
        }
        this.routing.push([args[0], args[1]]);
      }
      this.routing.push(["*", args[0]]);
    };
  }

  run(req: IncomingMessage, res: ServerResponse): void {
    let idx = 0;
    while (idx < this.routing.length) {
      const next = () => idx++;
      const [_, handler] = this.routing[idx];
      // TODO: matchRoutes
      const prevIdx = idx;
      handler(req, res, next);
      if (prevIdx === idx) break;
    }
  }
}

export function createSuica(): App {
  return new App();
}
