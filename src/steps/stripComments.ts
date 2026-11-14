import { Step } from "../step";

/** Remove `#` comments to end of line. A `#` inside a "quoted string" is kept. */
export const stripComments: Step = (lines) =>
  lines.map((line) => {
    let inQuote = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        inQuote = !inQuote;
      } else if (ch === "#" && !inQuote) {
        return line.slice(0, i);
      }
    }
    return line;
  });
