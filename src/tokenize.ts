/** Split a line on whitespace, keeping "quoted strings" intact. */
export function tokenize(line: string): string[] {
  const tokens: string[] = [];
  let current = "";
  let inQuote = false;

  for (const ch of line) {
    if (inQuote) {
      current += ch;
      if (ch === '"') {
        inQuote = false;
      }
      continue;
    }
    if (/\s/.test(ch)) {
      if (current) {
        tokens.push(current);
        current = "";
      }
      continue;
    }
    current += ch;
    if (ch === '"') {
      inQuote = true;
    }
  }
  if (current) {
    tokens.push(current);
  }
  return tokens;
}
