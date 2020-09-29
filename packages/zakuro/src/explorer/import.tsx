import { VNode } from "@kajitsu/lemon";
import fs from "fs";
import path from "path";

const atoms = fs
  .readdirSync(path.resolve(__dirname, "..", "atoms"), {
    withFileTypes: true,
  })
  .filter((file) => file.isDirectory());
console.log(atoms);

type Story = {
  [k: string]: () => VNode<any>;
};

export const atomsStories = atoms
  .map((f) => {
    const stories = require(`${__dirname}/../atoms/${f.name}/story.tsx`) as Story;
    return Object.entries(stories).map(([key, story]) => ({
      key: `atom/${f.name}/${key}`,
      story,
    }));
  })
  .flat() as { key: string; story: () => VNode<any> }[];
