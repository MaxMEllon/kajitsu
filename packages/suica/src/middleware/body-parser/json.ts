import { pipe } from "@kajitsu/ichigo";
import { Readable } from "stream";
import { RequestHandler } from "../..";

const concatStream = (stream: Readable) => {
  return new Promise((resolve, reject) => {
    const data: Array<Buffer> = [];
    const append = (chunk: Buffer) => data.push(chunk);
    const handleError = (err: Error) => reject(err);
    const concatString = () =>
      pipe(data.concat().toString(), JSON.parse, resolve);
    stream.on("data", append);
    stream.on("error", handleError);
    stream.on("end", concatString);
  });
};
export const json: RequestHandler = async (req, _res, next) => {
  try {
    await concatStream(req);
  } catch (err) {
    next(err);
  }
  next();
};
