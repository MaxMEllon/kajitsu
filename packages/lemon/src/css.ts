import { pipe } from "@kajitsu/ichigo";
import { FC, h } from ".";
import { InternalIntrinsicElements } from "./jsx";

const randomString = (): string => {
  const str =
    Math.random().toString(36).substring(2, 5) +
    Math.random().toString(36).substring(2, 5);
  for (const ctx of allContext) {
    if (ctx.map.has(str)) return randomString();
  }
  return str;
};

export type Context = {
  map: Map<string, string>;
  getClassNames(): string[];
  set(): Context;
  remove(): void;
};

let currentContext: Context | undefined;
const allContext: Context[] = [];

export const createStyleContext = () => {
  const ctx = {
    map: new Map<string, string>(),
    getClassNames(): string[] {
      return Array.from(this.map.keys());
    },
    set() {
      currentContext = this;
      allContext.push(ctx);
      return this;
    },
    remove() {
      const idx = allContext.findIndex((ctx) => ctx === this);
      if (idx === -1) return;
      allContext.splice(idx, 1);
    },
  };
  return ctx;
};

export const refreshContext = () => (currentContext = void 0);

const trimSpace = (str: string): string => str.replace(/\s+/g, "");
const trimNewLine = (str: string): string => str.replace("\n", "");
const trim = (str: string) => pipe(str, trimSpace, trimNewLine);

/**
 * @summary should be call renderToString before this.
 */
export const renderToStyleString = (ctx: Context) => {
  const items = Array.from(ctx.map.entries());
  return items
    .map(
      ([key, val]) =>
        `.${key}{${trim(val)
          .split(";")
          .filter((x) => x)
          .join(";")}}`
    )
    .join("");
};

type PropTypes<T extends FC | keyof InternalIntrinsicElements> = T extends FC<
  infer P
>
  ? P
  : T extends keyof InternalIntrinsicElements
  ? InternalIntrinsicElements[T]
  : unknown;

export const css = <P = {}>(node: FC | keyof InternalIntrinsicElements) => (
  strings: TemplateStringsArray,
  ...args: string[]
): FC<P & PropTypes<typeof node>> => {
  const className = randomString();
  const style = strings.reduce(
    (acc, cur, idx) => (args[idx] ? acc + cur + args[idx] : acc + cur),
    ""
  );
  const Component: FC<P> = (props) => {
    if (!currentContext)
      throw new Error("you should create context, before render");
    currentContext.map.set(className, style);
    // @ts-expect-error [2769] No overload matches this call.
    return h(node, { className, ...props });
  };
  return Component;
};
