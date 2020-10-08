import assert from "assert";
import {
  createMockIncomingMessage,
  createMockServerResponse,
} from "@kajitsu/naruto";
import { createSuica } from "..";

describe("createSuica", () => {
  it("expected handle request when use '/' middleware and got '/' request", async (done) => {
    const suica = createSuica();

    suica.use("/", async (_ctx, req, res) => {
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

    await suica.run(req, res);
  });

  it("expected chain middleware when use two middlewares", async (done) => {
    const suica = createSuica();

    suica.use(async (_ctx, _req, _res, next) => await next());
    suica.use(async (_ctx, req, res) => {
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

    await suica.run(req, res);
  });
});
