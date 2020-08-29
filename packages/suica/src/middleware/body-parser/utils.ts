import { Readable } from "stream";
import { pipe } from "@kajitsu/ichigo";

export const concatStream = (stream: Readable): Promise<string> => {
  return new Promise((resolve, reject) => {
    const data: Array<Buffer> = [];
    const append = (chunk: Buffer) => data.push(chunk);
    const handleError = (err: Error) => reject(err);
    const concatString = () => pipe(data.concat().toString(), resolve);
    stream.on("data", append);
    stream.on("error", handleError);
    stream.on("end", concatString);
  });
};
