import { renderToString } from "..";
import { css, getClassNames, renderToStyleString } from "../css";

describe("css", () => {
  it("works", () => {
    const Component = css("div")`
      color: black;
    `;
    // <Component /> == Component({})
    const string = renderToString(Component({}));
    const act = renderToStyleString();
    const classNames = getClassNames();
    expect(string).toEqual(`<div class="${classNames[0]}"></div>`);
    expect(act).toEqual(`<style>.${classNames[0]}{ color: black; }</style>`);
  });
});
