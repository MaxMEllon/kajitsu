import { ServerResponse } from "http";
import { Transform } from "stream";

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
