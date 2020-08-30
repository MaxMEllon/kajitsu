module.exports = {
  roots: ["."],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleDirectories: ["../../node_modules"],
  testRegex: "/__tests__/.*\\.spec\\.tsx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
