import { Step } from "../step";
import { tokenize } from "../tokenize";

/** Trim lines, collapse whitespace runs to one space and drop blank lines. */
export const stripWhitespace: Step = (lines) =>
  lines.map((line) => tokenize(line).join(" ")).filter((line) => line.length > 0);
