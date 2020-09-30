/**
 * @see https://www.w3.org/TR/html52/dom.html#global-attributes-2
 * @description
 * GlobalAttributes types based on html5 spec
 * W3C Semantics, structure, and APIs of HTML documents
 * 3.2.5.
 */

type WhatWGMicroData = Partial<{
  itemid: string;
  itemprop: string;
  itemref: string;
  itemscope: string;
  itemtype: string;
}>;

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
}> &
  WhatWGMicroData;

export interface InternalIntrinsicElements {
  // メインルート
  html: GlobalAttributes &
    Partial<{
      manifest: string;
    }>;

  // 文書メタデータ
  base: GlobalAttributes &
    Partial<{
      href: string;
      target: string;
    }>;
  head: GlobalAttributes;
  link: GlobalAttributes &
    Partial<{
      href: string;
      crossorigin: string;
      rel: string;
      media: string;
      integrity: string;
      hreflang: string;
      type: string;
      referrerpolicy: string;
      sizes: string;
      imagesrcset: string;
      imagesizes: string;
      as: string;
      color: string;
      disable: boolean;
    }>;
  meta: GlobalAttributes &
    Partial<{
      name: string;
      "http-equiv": string;
      content: string;
      charset: string;
    }>;
  style: GlobalAttributes &
    Partial<{
      media: string;
      title: string;
    }>;
  title: GlobalAttributes;

  // セクショニングルート
  body: GlobalAttributes;

  // コンテンツセクショニング
  address: GlobalAttributes;
  article: GlobalAttributes;
  aside: GlobalAttributes;
  footer: GlobalAttributes;
  header: GlobalAttributes;
  h1: GlobalAttributes;
  h2: GlobalAttributes;
  h3: GlobalAttributes;
  h4: GlobalAttributes;
  h5: GlobalAttributes;
  h6: GlobalAttributes;
  hgroup: GlobalAttributes;
  main: GlobalAttributes;
  nav: GlobalAttributes;
  section: GlobalAttributes;

  // テキストコンテンツ
  blockquote: GlobalAttributes &
    Partial<{
      cite: string;
    }>;
  dd: GlobalAttributes;
  dl: GlobalAttributes;
  dt: GlobalAttributes;
  div: GlobalAttributes;
  figcaption: GlobalAttributes;
  figure: GlobalAttributes;
  hr: GlobalAttributes;
  li: GlobalAttributes &
    Partial<{
      value: number;
    }>;
  ol: GlobalAttributes &
    Partial<{
      reversed: boolean;
      start: number;
      type: string;
    }>;
  p: GlobalAttributes;
  pre: GlobalAttributes;
  ul: GlobalAttributes;

  // インライン文字列意味付け
  a: GlobalAttributes &
    Partial<{
      href: string;
      target: string;
      download: string;
      ping: string;
      rel: string;
      hreflang: string;
      type: string;
    }>;
  abbr: GlobalAttributes &
    Partial<{
      title: string;
    }>;

  // wip
  span: GlobalAttributes;
  time: GlobalAttributes &
    Partial<{
      datetime: string;
    }>;
}

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
