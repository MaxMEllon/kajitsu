import {
  GlobalAttributes,
  VNode,
  FC,
  Children,
  ComponentChildren,
  InternalIntrinsicElements,
} from "./jsx";

namespace JSXInternal {
  export type Element = VNode;
  export type IntrinsicElements = InternalIntrinsicElements;
}

export type HTMLAttributes = GlobalAttributes;

export function createElement(
  type: string,
  props: HTMLAttributes | null,
  ...children: ComponentChildren
): VNode<any>;

export function createElement<P>(
  type: FC<P>,
  props: (P & { children?: ComponentChildren }) | null,
  ...children: Children[]
): VNode<any>;

export function createElement(type: any, props: any, ...children: any) {
  return {
    type,
    props: {
      children,
      ...props,
    },
  };
}
export namespace createElement {
  export import JSX = JSXInternal;
}

export function h(
  type: string,
  props: (HTMLAttributes & { className?: string }) | null,
  ...children: ComponentChildren
): VNode<any>;

export function h<P>(
  type: FC<P>,
  props: (P & { className?: string; children?: ComponentChildren }) | null,
  ...children: Children[]
): VNode<any>;

export function h(type: any, props: any, ...children: any) {
  // FXIME: should not use `.flat()`
  return createElement(type, props, ...children.flat());
}
export namespace h {
  export import JSX = JSXInternal;
}

