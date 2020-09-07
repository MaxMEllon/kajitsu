import assert from "assert";
import { h } from "..";

describe("createElement", () => {
  it("expected to get type as string VNode when give 1st args string", () => {
    const actual = h("p", { foo: "hoge" });
    assert.deepStrictEqual(actual, {
      props: {
        children: [],
        foo: "hoge",
      },
      type: "p",
    });
  });

  it("expected to get nested VNode when nested call", () => {
    const actual = h("div", {}, h("div", {}), h("div", {}));
    assert.deepStrictEqual(actual, {
      props: {
        children: [
          {
            props: {
              children: [],
            },
            type: "div",
          },
          {
            props: {
              children: [],
            },
            type: "div",
          },
        ],
      },
      type: "div",
    });
  });
});
