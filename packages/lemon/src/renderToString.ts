import { VNode } from ".";

const arrayToString = (node: VNode<{ children: any[] }>): string => {
  return node.props.children.map(renderToString).join("");
};

const attrToString = ([key, value]: [string, unknown]): string => {
  switch (key) {
    case "async": case "defer":
      return !!value ? key : '';
    case "className":
      return `class="${value}"`;
    case "aria-relevant":
      return `aria-relevant="${(value as Array<string>).join(" ")}"`;
    default:
      return `${key}="${value}"`;
  }
};

export function renderToString(node: VNode<any> | string | null): string {
  if (!node) return "";
  if (typeof node === "string") return node;
  const childrenAsArray =
    typeof node.props === "object" &&
    node.props != null &&
    node.props.children &&
    node.props.children.length >= 1;
  if (typeof node.type === "string") {
    const attr = Object.entries(node.props)
      .filter(([k, _]) => k !== "children")
      .map(attrToString)
      .join(" ")
      .trim();
    const typeAndAttr = `${node.type} ${attr}`.trim();
    if (childrenAsArray) {
      return `<${typeAndAttr}>${arrayToString(node)}</${node.type}>`;
    }
    return `<${typeAndAttr}></${node.type}>`;
  }
  if (childrenAsArray) {
    const { children, ...props } = node.props;
    return renderToString(
      node.type({
        ...props,
        children: children.map((c: any) => {
          return renderToString(c);
        }),
      })
    );
  }
  return renderToString(node.type(node.props));
}
