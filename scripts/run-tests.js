// Runs every compiled out/**/*.test.js; an assertion failure exits non-zero.
const fs = require("fs");
const path = require("path");

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
    } else if (entry.name.endsWith(".test.js")) {
      require(path.resolve(full));
      console.log("ok", path.relative("out", full));
    }
  }
}
walk("out");
