import { h } from "..";
import { css, getClassNames } from "../css";

describe("css", () => {
  it("works", () => {
    const Component = css.div`
      color: black;
    `;
    const classNames = getClassNames();
    expect(Component({})).toEqual(
      h("div", { children: [], className: classNames[0] })
    );
  });
});
