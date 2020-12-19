import { h } from "..";
import { renderToString } from "../renderToString";

describe("renderToString", () => {
  it("works", () => {
    const actual = renderToString(
      // prettier-ignore
      h('div', {},
        h('ul', {},
          h('li', {}, 'foo'),
          h('li', {}, 'bar'),
          h('li', {}, 'hoge')
        )
      )
    );
    expect(actual).toEqual(
      "<div><ul><li>foo</li><li>bar</li><li>hoge</li></ul></div>"
    );
  });

  it("expect to set class if got className", () => {
    const actual = renderToString(
      // prettier-ignore
      h('div', { className: 'hoge' })
    );
    expect(actual).toEqual(`<div class="hoge"></div>`);
  });

  it("expect joined string if got aria-relevant token list", () => {
    const actual = renderToString(<div aria-relevant={["additions", "all"]} />);
    expect(actual).toEqual(`<div aria-relevant="additions all"></div>`);
  });

  it("async/defer attribute expected key only", () => {
    const actual1 = renderToString(<script async />);
    expect(actual1).toEqual(`<script async></script>`);
    const actual2 = renderToString(<script defer />);
    expect(actual2).toEqual(`<script defer></script>`);
  });
});
