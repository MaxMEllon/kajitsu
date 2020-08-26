import { Readable } from "stream";
import { pipe } from "@kajitsu/ichigo";

export function readBodyAsJSON(stream: Readable): Promise<string> {
  const data: Array<Buffer> = [];
  return new Promise((resolve, reject) => {
    const append = (chunk: Buffer) => data.push(chunk);
    const handleError = (err: Error) => reject(err);
    const concatString = () =>
      pipe(data.concat().toString(), JSON.parse, resolve);
    stream.on("data", append);
    stream.on("error", handleError);
    stream.on("end", concatString);
  });
}
