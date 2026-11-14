/** Every token in the program, plus label tokens without their trailing colon. */
export function usedNames(tokenLines: string[][]): Set<string> {
  const used = new Set<string>();
  for (const token of tokenLines.flat()) {
    used.add(token);
    used.add(token.replace(/:$/, ""));
  }
  return used;
}

/** Yields `prefix` + two letters (aa, ab, ... zz), skipping used or reserved names. */
export function* shortNames(
  prefix: string,
  used: Set<string>,
  reserved: Set<string> = new Set()
): Generator<string> {
  const a = "a".charCodeAt(0);
  for (let i = 0; i < 26; i++) {
    for (let j = 0; j < 26; j++) {
      const name = prefix + String.fromCharCode(a + i) + String.fromCharCode(a + j);
      if (!used.has(name) && !reserved.has(name)) {
        yield name;
      }
    }
  }
}
