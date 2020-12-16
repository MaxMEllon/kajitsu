import { classnames } from "../classnames";

describe("classnames", () => {
  it.each`
    args                            | expected
    ${["a", "b", false && "c"]}     | ${"a b"}
    ${[true ? "a" : "b", "c", "b"]} | ${"a c b"}
  `(`returns $expected when got $args`, ({ args, expected }) => {
    const actual = classnames(...args);
    expect(actual).toBe(expected);
  });
});
