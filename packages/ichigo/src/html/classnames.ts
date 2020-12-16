export const classnames = (
  ...names: Array<string | void | boolean>
): string => {
  return names.filter((x) => x).join(" ");
};
