import assert from "assert";
import { IncomingMessage } from "http";
import { Transform } from "stream";
import { contentType } from "../content-type";

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

describe("content-type", () => {
  it("got media object when give valid `content-type` string", () => {
    const req = createMockIncomingMessage({
      headers: { "content-type": "application/json" },
    });
    const actual = contentType(req);
    assert.strictEqual(actual.type, "application");
    assert.strictEqual(actual.subtype, "json");
  });
});
