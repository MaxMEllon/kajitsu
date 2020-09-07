/// <reference lib="dom" />

import { VNode } from ".";

declare namespace JSX {
  type Element = VNode;
  interface IntrinsicElements {
    div: {};
    p: {};
    span: {};
  }
}
