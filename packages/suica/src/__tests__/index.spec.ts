import assert from "assert";
import {
  createMockIncomingMessage,
  createMockServerResponse,
} from "@kajitsu/naruto";
import { createSuica } from "..";

describe("createSuica", () => {
  it("expected handle request when use '/' middleware and got '/' request", (done) => {
    const suica = createSuica();

    suica.use("/", (_ctx, req, res) => {
      assert.strictEqual(req.method, "GET");
      res.write("foo");
      res.end();
      done();
    });

    const req = createMockIncomingMessage({
      url: "http://localhost:3000/",
      method: "GET",
    });
    const res = createMockServerResponse();

    suica.run(req, res);
  });

  it("expected chain middleware when use two middlewares", (done) => {
    const suica = createSuica();

    suica.use((_ctx, _req, _res, next) => next());
    suica.use((_ctx, req, res) => {
      assert.strictEqual(req.method, "POST");
      res.write("foo");
      res.end();
      done();
    });

    const req = createMockIncomingMessage({
      url: "http://localhost:3000/",
      method: "POST",
    });
    const res = createMockServerResponse();

    suica.run(req, res);
  });
});
