type TriState = "true" | "false" | "mixed" | "undefined"; // default "undefined"

/**
 * refs: https://www.w3.org/TR/2014/REC-wai-aria-20140320/states_and_properties.html
 */
export type WAIAria = Partial<{
  "aria-activedescendant": "";
  "aria-atomic": "true" | "false"; // defalut "false"
  "aria-autocomplete": "inline" | "list" | "both" | "none"; // default "none"
  "aria-busy": "true" | "false"; // default "false"
  "aria-checked": TriState;
  "aria-controls": string;
  "aria-describedby": string;
  "aria-disabled": "true" | "false"; // default "false"
  "aria-dropeffect": "copy" | "move" | "link" | "execute" | "popup" | "none"; // default "none"
  "aria-expanded": "true" | "false" | "undefined"; // default "undefined"
  "aria-flowto": string;
  "aria-grabbed": "true" | "false" | "undefined"; // default "undefined"
  "aria-haspopup": "true" | "false"; // default "false"
  "aria-hidden": "true" | "false"; // default "false"
  "aria-invalid": "grammar" | "false" | "spelling" | "true"; // default "false"
  /**
   * @description
   * If the label text is visible on screen, authors SHOULD use aria-labelledby and SHOULD NOT use aria-label.
   */
  "aria-label": string;
  "aria-labelledby": string;
  "aria-level": number;
  "aria-live": "log" | "status" | "alert" | "progressbar" | "marquee" | "timer";
  "aria-multiline": "true" | "false"; // default "false"
  "aria-multiselectable": "true" | "false"; // default "false"
  "aria-orientation": "vertical" | "horizontal"; // default "horizontal"
  "aria-owns": string;
  "aria-posinset": number;
  "aria-pressed": TriState;
  "aria-readonly": "true" | "false"; // default "false"
  "aria-relevant": Array<"additions" | "removals" | "text" | "all">; // default "additions text"
  "aria-required": "true" | "false";
  "aria-selected": "true" | "false" | "undefined"; // default "undefined";
  "aria-setsize": number;
  "aria-sort": "ascending" | "descending" | "none" | "other"; // default "none"
  "aria-valuemax": number;
  "aria-valuemin": number;
  "aria-valuenow": number;
  "aria-valuetext": string;
}>;
