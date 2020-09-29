import { http } from "@kajitsu/ichigo";
import { RequestHandler } from "../..";
import { concatStream } from "./utils";

declare global {
  namespace Suica {
    export interface Context {
      body?: string;
    }
  }
}

export const json: RequestHandler = async (ctx, req, _res, next) => {
  try {
    if (http.contentType(req).subtype !== "json") return next();
    const string = await concatStream(req);
    ctx.body = JSON.parse(string);
  } catch {
    next();
  }
};
