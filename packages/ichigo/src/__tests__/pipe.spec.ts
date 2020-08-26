import assert from "assert";
import { pipe } from "../pipe";

describe("pipe", () => {
  it("1op", () => {
    const op1 = (val: number) => val + 1;
    const actual = pipe(1, op1);
    assert.strictEqual(actual, 2);
  });

  it("2op", () => {
    const op1 = (val: number) => val + 1;
    const op2 = (val: number): string => String(val);
    const actual = pipe(1, op1, op2);
    assert.strictEqual(actual, "2");
  });
});
