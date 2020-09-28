import { FC, h } from ".";

const map = new Map<string, string>();

const randomString = (): string => {
  const str =
    Math.random().toString(36).substring(2, 5) +
    Math.random().toString(36).substring(2, 5);
  if (map.has(str)) return randomString();
  return str;
};

export const getClassNames = (): string[] => Array.from(map.keys());

export const css = <P = {}>(node: FC | string) => (
  strings: TemplateStringsArray,
  ...args: string[]
): FC<P> => {
  const className = randomString();
  const style = strings.reduce(
    (acc, cur, idx) => (args[idx] ? acc + cur + args[idx] : acc + cur),
    ""
  );
  const rawString = `.${className} { ${style} }`;
  map.set(className, rawString);
  const Component: FC<P> = (props) => h(node, { className, ...props });
  return Component;
};

css.div = css("div");
css.p = css("p");
css.span = css("span");
