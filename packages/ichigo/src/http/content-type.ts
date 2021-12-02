import { IncomingMessage } from "http";

const TYPE_REGEXP = /^ *([A-Za-z0-9][A-Za-z0-9!#$&^_-]{0,126})\/([A-Za-z0-9][A-Za-z0-9!#$&^_.+-]{0,126}) *$/;

export type MediaType = {
  type: string;
  subtype: string;
  suffix?: string;
};

const parse = (contentType: string | void): MediaType => {
  if (!contentType || typeof contentType !== "string") {
    throw new TypeError(`expected string, but got ${typeof contentType}`);
  }

  const match = TYPE_REGEXP.exec(contentType.toLowerCase());
  if (!match) {
    throw new TypeError("invalid format");
  }

  const type = match[1];
  let subtype = match[2];
  let suffix;

  const index = subtype.lastIndexOf("+");

  if (index !== -1) {
    suffix = subtype.substring(index + 1);
    subtype = subtype.substring(0, index);
  }

  return {
    type,
    subtype,
    suffix,
  };
};

export const contentType = (req: IncomingMessage): MediaType => {
  const contentType = req.headers["content-type"];
  const mediaType = parse(contentType);
  return mediaType;
};
