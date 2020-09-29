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

