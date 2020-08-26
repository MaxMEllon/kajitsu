import { IncomingMessage, ServerResponse } from "http";
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
      this.headers = {};
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

export const createMockServerResponse = (
  finish?: () => void
): ServerResponse => {
  const MockServerResponse = class extends Transform {
    public statusCode: number;
    public finished: boolean;
    public _header: Record<string, string>;
    public _headers: Record<string, string>;
    public _responseData: Array<any>;

    constructor() {
      super();
      this.statusCode = 200;
      this._header = this._headers = {};
      if (typeof finish === "function") this.on("finish", finish);
      this._responseData = [];

      this.finished = false;
    }

    _transform(_data: string) {}
  };
  // @ts-ignore
  return new MockServerResponse() as ServerResponse;
};
