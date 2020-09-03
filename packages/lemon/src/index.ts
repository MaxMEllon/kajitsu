export interface FC<P = {}> {
  (props: P & { children?: ComponentChildren }): VNode<any> | null;
}

export type Children = VNode<any> | string | null;
export type ComponentChildren = Children | Children[];

export interface VNode<P = {}> {
  key?: string | number;
  type: FC<P> | string;
  props: P & { children?: ComponentChildren };
}

export interface HTMLAttributes {}

export interface createElement {
  (
    type: string,
    props: HTMLAttributes | null,
    ...children: ComponentChildren[]
  ): VNode<any>;

  <P>(
    type: FC<P>,
    props: (P & { children?: ComponentChildren }) | null,
    ...children: Children[]
  ): VNode<any>;
}

export function createElement<P = {}>(
  type: string | FC<P>,
  props: Record<string, any> & { children?: ComponentChildren },
  ...children: Children[]
) {
  return {
    type,
    props: {
      children,
      ...props,
    },
  };
}

export const h = createElement
