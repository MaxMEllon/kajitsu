import * as css from "./css";

namespace JSXInternal {
  export type Element = VNode;

  export interface IntrinsicElements {
    div: GlobalAttributes;
    p: GlobalAttributes;
    span: GlobalAttributes;
    time: GlobalAttributes &
      Partial<{
        datetime: string;
      }>;
  }
}

/**
 * @see https://www.w3.org/TR/html52/dom.html#global-attributes-2
 * @description
 * GlobalAttributes types based on html5 spec
 * W3C Semantics, structure, and APIs of HTML documents
 * 3.2.5.
 */
export type GlobalAttributes = Partial<{
  accesskey: string;
  contenteditable: string;
  dir: string;
  draggable: string;
  hidden: string;
  id: string;
  lang: string;
  spellcheck: string;
  style: string;
  tabindex: string;
  title: string;
  translate: string;
}>;

export interface FC<P = {}> {
  (props: P & { children?: ComponentChildren }): VNode<any> | null;
}

export type Children = VNode<any> | string | null;
export type ComponentChildren = Children[];

export interface VNode<P = {}> {
  key?: string | number;
  type: FC<P> | string;
  props: P & { children?: ComponentChildren };
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
  return createElement(type, props, ...children);
}
export namespace h {
  export import JSX = JSXInternal;
}

export const styled = css.css;
export const renderToStyleString = css.renderToStyleString;
export const refreshStyleCache = css.refreshCache;
