import { h, FC } from "@kajitsu/lemon";

export const Time: FC<{ datetime?: string }> = ({ datetime, children }) => {
  if (datetime) return <time datetime={datetime}>{children}</time>;
  return <time>{children}</time>;
};
