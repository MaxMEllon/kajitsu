import assert from "assert";
import { createMockIncomingMessage } from "@kajitsu/naruto";
import { contentType } from "../content-type";

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
