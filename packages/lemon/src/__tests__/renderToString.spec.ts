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
});
