import { Step } from "../step";
import { tokenize } from "../tokenize";

/** Instruction mnemonics that match daa-dzz and must not be used as define names. */
const RESERVED = new Set(["div"]);

/**
 * Rename define names to daa, dab, ... dzz in order of definition.
 * Names already used in the program (including labels) are skipped.
 * If names run out (highly unlikely), the remaining defines keep their original name.
 */
export const compressDefines: Step = (lines) => {
  const tokenLines = lines.map(tokenize);

  const used = new Set<string>();
  for (const token of tokenLines.flat()) {
    used.add(token);
    used.add(token.replace(/:$/, "")); // label names
  }

  const names = defineNames(used);
  const map = new Map<string, string>();
  for (const tokens of tokenLines) {
    if (tokens[0] === "define" && tokens.length === 3 && !map.has(tokens[1])) {
      const next = names.next();
      if (next.done) {
        break;
      }
      map.set(tokens[1], next.value);
    }
  }

  return tokenLines.map((tokens) => tokens.map((t) => map.get(t) ?? t).join(" "));
};

function* defineNames(used: Set<string>): Generator<string> {
  const a = "a".charCodeAt(0);
  for (let i = 0; i < 26; i++) {
    for (let j = 0; j < 26; j++) {
      const name = "d" + String.fromCharCode(a + i) + String.fromCharCode(a + j);
      if (!used.has(name) && !RESERVED.has(name)) {
        yield name;
      }
    }
  }
}
