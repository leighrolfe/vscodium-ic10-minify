import { tokenize } from "../tokenize";

/**
 * Inline aliases whose target satisfies `isTarget` and drop their alias lines.
 * Processed top to bottom so redefinitions (`alias Dev d0` ... `alias Dev d1`)
 * and chains (`alias B A`) work. Aliases to anything else (e.g. HASH("...")) are kept.
 */
export function inlineAliases(
  lines: string[],
  isTarget: (target: string) => boolean
): string[] {
  const map = new Map<string, string>();
  const out: string[] = [];

  for (const line of lines) {
    const tokens = tokenize(line);

    if (tokens[0] === "alias" && tokens.length === 3) {
      const [, name, rawTarget] = tokens;
      const target = map.get(rawTarget) ?? rawTarget;
      if (isTarget(target)) {
        map.set(name, target);
        continue; // alias line is dropped
      }
      map.delete(name); // redefined as something else
    }

    out.push(tokens.map((t) => map.get(t) ?? t).join(" "));
  }
  return out;
}
