import { http } from "@kajitsu/ichigo";
import { RequestHandler } from "../..";
import { concatStream } from "./utils";
import { http } from "@kajitsu/ichigo";

declare global {
  namespace Suica {
    export interface Context {
      body?: string;
    }
  }
}

export const json: RequestHandler = async (ctx, req, _res, next) => {
  if (http.contentType(req).subtype !== "json") return next();
  try {
    const string = await concatStream(req);
    ctx.body = JSON.parse(string);
  } catch (err) {
    next(err);
  }
  next();
};
