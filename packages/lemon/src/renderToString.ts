import { createElement, VNode } from ".";

const arrayToString = (node: VNode<{ children: any[] }>): string => {
  return node.props.children.map(renderToString).join("");
};

const attrToString = ([key, value]: [string, unknown]): string => {
  switch (key) {
    case "className":
      return `class="${value}"`;
    default:
      return `${key}="${value}"`;
  }
};

export function renderToString(node: VNode<any> | string | null): string {
  if (!node) return "";
  if (typeof node === "string") return node;
  const childrenAsArray =
    typeof node.props === "object" && node.props != null && node.props.children;
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
    return node.props.children.map(renderToString);
  }
  return renderToString(createElement(node.type, node.props));
}
