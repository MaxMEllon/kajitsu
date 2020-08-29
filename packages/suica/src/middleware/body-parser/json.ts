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
    const string = await concatStream(req);
    ctx.body = JSON.parse(string);
  } catch (err) {
    next(err);
  }
  next();
};
