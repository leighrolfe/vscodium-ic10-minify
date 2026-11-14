import { Step } from "../step";
import { tokenize } from "../tokenize";
import { shortNames, usedNames } from "../names";

/**
 * Rename labels to dlaa, dlab, ... dlzz in order of definition, updating every
 * reference (j, jal, branches). Names already used in the program are skipped.
 * If names run out, the remaining labels keep their original name.
 */
export const compressLabels: Step = (lines) => {
  const tokenLines = lines.map(tokenize);
  const names = shortNames("dl", usedNames(tokenLines));

  const map = new Map<string, string>();
  for (const tokens of tokenLines) {
    const first = tokens[0] ?? "";
    if (first.length > 1 && first.endsWith(":")) {
      const name = first.slice(0, -1);
      if (!map.has(name)) {
        const next = names.next();
        if (next.done) {
          break;
        }
        map.set(name, next.value);
      }
    }
  }

  return tokenLines.map((tokens) =>
    tokens
      .map((t, i) => {
        if (i === 0 && t.endsWith(":")) {
          const renamed = map.get(t.slice(0, -1));
          if (renamed) {
            return renamed + ":";
          }
        }
        return map.get(t) ?? t;
      })
      .join(" ")
  );
};
