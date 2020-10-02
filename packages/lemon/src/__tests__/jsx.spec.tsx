import { h, FC } from "..";
import { renderToString } from "../renderToString";

describe("renderToString", () => {
  it("works", () => {
    const actual = renderToString(
      <html>
        <head></head>
        <body></body>
      </html>
    );
    expect(actual).toEqual("<html><head></head><body></body></html>");
  });

  it("works with FC", () => {
    const Html: FC = () => (
      <html>
        <head></head>
        <body></body>
      </html>
    );
    const actual = renderToString(<Html />);
    expect(actual).toEqual("<html><head></head><body></body></html>");
  });

  it("works with children", () => {
    const Html: FC = ({ children }) => (
      <html>
        <head></head>
        <body>{children}</body>
      </html>
    );
    const P: FC = ({ children }) => <p>{children}</p>;
    const actual = renderToString(
      <Html>
        <P>hoge</P>
      </Html>
    );
    expect(actual).toEqual(
      "<html><head></head><body><p>hoge</p></body></html>"
    );
  });
});
