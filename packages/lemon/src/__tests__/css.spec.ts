import { createStyleContext, renderToString } from "..";
import { css, renderToStyleString } from "../css";

describe("css", () => {
  it("works", () => {
    const Component = css("div")`
      color: black;
    `;
    const ctx = createStyleContext().set();
    const string = renderToString(Component({}));
    const act = renderToStyleString(ctx);
    const classNames = ctx.getClassNames();
    expect(string).toEqual(`<div class="${classNames[0]}"></div>`);
    expect(act).toEqual(`.${classNames[0]}{ color: black; }`);
  });
});
