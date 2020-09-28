import { h } from "..";
import { css, getClassNames, renderToStyleString } from "../css";

describe("css", () => {
  it("works", () => {
    const Component = css.div`
      color: black;
    `;
    const classNames = getClassNames();
    // <Component /> == Component({})
    expect(Component({})).toEqual(
      h("div", { children: [], className: classNames[0] })
    );
    const act = renderToStyleString();
    expect(act).toEqual(`<style>.${classNames[0]}{ color: black; }</style>`);
  });
});
