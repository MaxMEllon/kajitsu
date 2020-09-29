import { pipe } from "@kajitsu/ichigo";
import { FC, h } from ".";

let map = new Map<string, string>();

const randomString = (): string => {
  const str =
    Math.random().toString(36).substring(2, 5) +
    Math.random().toString(36).substring(2, 5);
  if (map.has(str)) return randomString();
  return str;
};

export const refreshCache = () => (map = new Map<string, string>());

export const getClassNames = (): string[] => Array.from(map.keys());

const trimSpace = (str: string): string => str.replace(/\s+/g, " ");
const trimNewLine = (str: string): string => str.replace("\n", " ");
const trim = (str: string) => pipe(str, trimSpace, trimNewLine);

/**
 * @summary should be call renderToString before this.
 */
export const renderToStyleString = () => {
  const concatString = () =>
    Array.from(map.entries())
      .map(([key, val]) => `.${key}{${trim(val)}}`)
      .join(" ");
  return `<style>${concatString()}</style>`;
};

export const css = <P = {}>(node: FC | string) => (
  strings: TemplateStringsArray,
  ...args: string[]
): FC<P> => {
  const className = randomString();
  const style = strings.reduce(
    (acc, cur, idx) => (args[idx] ? acc + cur + args[idx] : acc + cur),
    ""
  );
  map.set(className, style);
  // @ts-expect-error [2769] No overload matches this call.
  const Component: FC<P> = (props) => h(node, { className, ...props });
  return Component;
};

css.div = css("div");
css.p = css("p");
css.span = css("span");
