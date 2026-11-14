/**
 * Minify IC10 source.
 * Step 1: strip comments (# to end of line, ignoring # inside "quoted strings")
 * Step 2: strip whitespace (trim, collapse runs to one space, drop blank lines)
 */
export function minify(source: string): string {
  const out: string[] = [];
  for (const raw of source.split(/\r\n|\r|\n/)) {
    const line = minifyLine(raw);
    if (line.length > 0) {
      out.push(line);
    }
  }
  return out.join("\n");
}

function minifyLine(line: string): string {
  let result = "";
  let inQuote = false;
  let pendingSpace = false;

  for (const ch of line) {
    if (inQuote) {
      result += ch;
      if (ch === '"') {
        inQuote = false;
      }
      continue;
    }
    if (ch === "#") {
      break;
    }
    if (/\s/.test(ch)) {
      pendingSpace = result.length > 0;
      continue;
    }
    if (pendingSpace) {
      result += " ";
      pendingSpace = false;
    }
    result += ch;
    if (ch === '"') {
      inQuote = true;
    }
  }
  return result;
}
