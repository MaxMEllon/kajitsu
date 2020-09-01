import { IncomingMessage } from "http";
import { Transform } from "stream";

export const createMockIncomingMessage = (opt?: {
  method?: string;
  url?: string;
  headers?: Record<string, string>;
}): IncomingMessage => {
  const MockIncomingMessage = class extends Transform {
    public method: string;
    public url: string;
    public headers: Record<string, string>;
    public rawHeaders: Array<string>;

    constructor() {
      super();
      this.method = opt?.method || "GET";
      this.url = opt?.url || "";
      this.headers = opt?.headers || {};
      // TODO: opt.headers convert rawHeaders object
      this.rawHeaders = [];
      if (
        this.method === "GET" ||
        this.method === "HEAD" ||
        this.method === "DELETE"
      )
        this.end();
    }
  };
  // @ts-ignore
  return new MockIncomingMessage() as IncomingMessage;
};
