export const globalStyle = `
  html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p,
  blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em,
  img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u,
  i, center, hr, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
  caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details,
  embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby,
  section, summary, time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font: inherit;
    vertical-align: baseline;
  }
  article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section {
    display: block;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote::before, blockquote::after, q::before, q::after {
    content: '';
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  img {
    max-width: 100%;
    border-style: none;
  }
  :disabled {
    cursor: not-allowed;
  }
  * {
    box-sizing: border-box;
  }
  *::before, *::after {
    box-sizing: inherit;
  }
  body {
    background: transparent;
    font-family: "Helvetica Neue",
    Arial,
    "Hiragino Kaku Gothic ProN",
    "Hiragino Sans",
    Meiryo,
    sans-serif;
    font-size: 16px;
    line-height: 1.75;
  }
  h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
  }
  button {
    border: none;
    padding: 0;
    background: none;
    color: inherit;
    font: inherit;
    appearance: none;
    box-shadow: 0 2px 8px 0 rgba(24, 74, 70, 0.2);
    text-shadow: 0 2px 8px 0 rgba(24, 74, 70, 0.2);

    &:active {
      box-shadow: none;
      text-shadow: none;
      transform: translateY(1px);
    }
  }
`;
