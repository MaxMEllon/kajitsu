/**
 * @see https://www.w3.org/TR/html52/dom.html#global-attributes-2
 * @description
 * GlobalAttributes types based on html5 spec
 * W3C Semantics, structure, and APIs of HTML documents
 * 3.2.5.
 */

import { AutoComplete } from "./autocomplete";
import { RFC2978 } from "./rfc2978";
import { Role } from "./role";
import { WAIAria } from "./wai-aria";

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
  class: string;
}> &
  WhatWGMicroData &
  WAIAria &
  Partial<{ role: Role }>;

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
      charset: RFC2978;
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
  b: GlobalAttributes;
  bdi: GlobalAttributes &
    Partial<{
      dir: "ltr" | "rtl" | "auto";
    }>;
  bdo: GlobalAttributes &
    Partial<{
      dir: "ltr" | "rtl" | "auto";
    }>;
  br: GlobalAttributes;
  cite: GlobalAttributes;
  code: GlobalAttributes;
  data: GlobalAttributes &
    Partial<{
      value: string;
    }>;
  dfn: GlobalAttributes &
    Partial<{
      title: string;
    }>;
  em: GlobalAttributes;
  i: GlobalAttributes;
  kbd: GlobalAttributes;
  mark: GlobalAttributes;
  q: GlobalAttributes &
    Partial<{
      cite: string;
    }>;
  rb: GlobalAttributes;
  rp: GlobalAttributes;
  rt: GlobalAttributes;
  rtc: GlobalAttributes;
  ruby: GlobalAttributes;
  s: GlobalAttributes;
  samp: GlobalAttributes;
  small: GlobalAttributes;
  span: GlobalAttributes;
  strong: GlobalAttributes;
  sub: GlobalAttributes;
  sup: GlobalAttributes;
  time: GlobalAttributes &
    Partial<{
      datetime: string;
    }>;
  u: GlobalAttributes;
  var: GlobalAttributes;
  wbr: GlobalAttributes;

  // 画像とマルチメディア
  area: GlobalAttributes &
    Partial<{
      alt: string;
      coords: string;
      shape: string;
      href: string;
      target: string;
      download: string;
      ping: string;
      rel: string;
      referrerpolicy: string;
    }>;
  audio: GlobalAttributes &
    Partial<{
      src: string;
      crossorigin: string;
      preload: string;
      autoplay: string;
      loop: string;
      muted: string;
      controls: string;
    }>;
  img: GlobalAttributes &
    Partial<{
      alt: string;
      src: string;
      srcset: string;
      sizes: string;
      crossorigin: string;
      usemap: string;
      ismap: string;
      width: string;
      height: string;
      referrerpolicy: string;
      decoding: string;
      loading: string;
    }>;
  map: GlobalAttributes &
    Partial<{
      name: string;
    }>;
  track: GlobalAttributes &
    Partial<{
      kind: string;
      src: string;
      srclang: string;
      label: string;
      default: string;
    }>;
  video: GlobalAttributes &
    Partial<{
      src: string;
      crossorigin: string;
      poster: string;
      preload: string;
      autoplay: string;
      playsinline: string;
      loop: string;
      muted: string;
      controls: string;
      width: string;
      height: string;
    }>;

  // 埋め込みコンテンツ
  embed: GlobalAttributes &
    Partial<{
      src: string;
      type: string;
      width: string;
      height: string;
    }>;
  iframe: GlobalAttributes &
    Partial<{
      src: string;
      srcdoc: string;
      name: string;
      sandbox: string;
      allow: string;
      allowfullscreen: string;
      width: string;
      height: string;
      referrerpolicy: string;
      loading: string;
    }>;
  object: GlobalAttributes &
    Partial<{
      data: string;
      type: string;
      name: string;
      usemap: string;
      form: string;
      width: string;
      height: string;
    }>;
  param: GlobalAttributes &
    Partial<{
      name: string;
      value: string;
    }>;
  picture: GlobalAttributes;
  source: GlobalAttributes &
    Partial<{
      src: string;
      type: string;
      srcset: string;
      sizes: string;
      media: string;
    }>;

  // スクリプティング
  canvas: GlobalAttributes &
    Partial<{
      width: string;
      height: string;
    }>;
  noscript: GlobalAttributes;
  script: GlobalAttributes &
    Partial<{
      src: string;
      type: string;
      nomodule: boolean;
      async: boolean;
      defer: boolean;
      crossorigin: string;
      integrity: string;
      referrerpolicy: string;
    }>;

  // 編集範囲の特定
  del: GlobalAttributes &
    Partial<{
      cite: string;
      datetime: string;
    }>;
  ins: GlobalAttributes &
    Partial<{
      cite: string;
      datetime: string;
    }>;

  // table
  caption: GlobalAttributes;
  col: GlobalAttributes & Partial<{ span: number }>;
  colgroup: GlobalAttributes & Partial<{ span: number }>;
  table: GlobalAttributes;
  tbody: GlobalAttributes;
  thead: GlobalAttributes;
  tfoot: GlobalAttributes;
  td: GlobalAttributes &
    Partial<{
      colspan: string;
      rowspan: string;
      headers: string;
    }>;
  th: GlobalAttributes &
    Partial<{
      colspan: string;
      rowspan: string;
      headers: string;
      scope: string;
      abbr: string;
    }>;
  tr: GlobalAttributes;

  // form
  button: GlobalAttributes &
    Partial<{
      disabled: string;
      form: string;
      formaction: string;
      formenctype: string;
      formmethod: string;
      formnovalidate: string;
      formtarget: string;
      name: string;
      type: string;
      value: string;
    }>;
  datalist: GlobalAttributes;
  fieldset: GlobalAttributes &
    Partial<{
      disabled: string;
      form: string;
      name: string;
    }>;
  form: GlobalAttributes &
    Partial<{
      "accept-charset": RFC2978;
      action: string;
      autocomplete: AutoComplete;
      enctype: string;
      method: string;
      name: string;
      novalidate: string;
      target: string;
      rel: string;
    }>;
  input: GlobalAttributes &
    Partial<{
      accept: string;
      alt: string;
      autocomplete: AutoComplete;
      checked: string;
      dirname: string;
      disabled: boolean;
      form: string;
      formaction: string;
      formenctype: string;
      formmethod: string;
      formnovalidate: string;
      formtarget: string;
      height: string;
      list: string;
      max: string;
      maxlength: string;
      min: string;
      minlength: string;
      multiple: string;
      name: string;
      pattern: string;
      placeholder: string;
      readonly: boolean;
      required: boolean;
      size: string;
      src: string;
      step: string;
      type: string;
      value: string;
      width: string;
    }>;
  label: GlobalAttributes &
    Partial<{
      for: string;
    }>;
  legend: GlobalAttributes;
  meter: GlobalAttributes &
    Partial<{
      value: number;
      min: number;
      max: number;
      low: number;
      high: number;
      optimum: number;
    }>;
  optgroup: GlobalAttributes &
    Partial<{
      disabled: boolean;
      label: string;
    }>;
  option: GlobalAttributes &
    Partial<{
      disabled: boolean;
      label: string;
    }>;
  output: GlobalAttributes &
    Partial<{
      for: string;
      form: string;
      name: string;
    }>;
  progress: GlobalAttributes &
    Partial<{
      value: number;
      max: number;
    }>;
  select: GlobalAttributes &
    Partial<{
      autocomplete: AutoComplete;
      disabled: boolean;
      form: string;
      multiple: string;
      name: string;
      required: boolean;
      size: string;
    }>;
  textarea: GlobalAttributes &
    Partial<{
      autocomplete: AutoComplete;
      cols: number;
      dirname: string;
      disabled: boolean;
      form: string;
      maxlength: number;
      minlength: number;
      name: string;
      placeholder: string;
      readonly: boolean;
      required: boolean;
      rows: number;
      wrap: number;
    }>;

  // interactive
  details: GlobalAttributes &
    Partial<{
      open: boolean;
    }>;
  dialog: GlobalAttributes &
    Partial<{
      open: boolean;
    }>;
  menu: GlobalAttributes;
  summary: GlobalAttributes;
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
