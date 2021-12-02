import assert from "assert";
import { IncomingMessage } from "http"
import { createMockIncomingMessage } from "@kajitsu/naruto";
import { contentType, MediaType } from "../content-type";

describe("content-type", () => {
  it("got media object when give valid `content-type` string", () => {
    const req = createMockIncomingMessage({
      headers: { "content-type": "application/json" },
    });
    const actual = contentType(req);
    assert.strictEqual(actual.type, "application");
    assert.strictEqual(actual.subtype, "json");
  });

  const table: Array<[
    string,
    {
      given: IncomingMessage
      expected: MediaType
    }
  ]> = [
    [
      'application/vnd.ms-excel',
      {
        given: createMockIncomingMessage({
          headers: { 'content-type': 'application/vnd.ms-excel' }
        }),
        expected: {
          type: 'application',
          subtype: 'vnd.ms-excel',
          suffix: undefined
        }
      },
    ],
    [
      'application/svg+xml',
      {
        given: createMockIncomingMessage({
          headers: { 'content-type': 'image/svg+xml' }
        }),
        expected: {
          type: 'image',
          subtype: 'svg',
          suffix: 'xml'
        }
      },
    ]
  ]

  it.each(table)('got %s', (name, { given, expected }) => {
    const actual = contentType(given)
    assert.deepStrictEqual(actual, expected)
  })
});
