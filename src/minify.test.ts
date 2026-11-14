import { strict as assert } from "assert";
import { minify } from "./minify";

assert.equal(
  minify(
    [
      "# Pump control",
      "",
      "alias Pump d0",
      "alias Temp r0",
      'alias Tank HASH("Tank # 1")',
      "define   Target 300   # kelvin",
      "main:",
      "    yield",
      "    sub Temp Temp Target",
      "    s Pump On Temp",
      "    j main",
      "",
    ].join("\r\n")
  ),
  [
    'alias Tank HASH("Tank # 1")',
    "define daa 300",
    "dlaa:",
    "yield",
    "sub r0 r0 daa",
    "s d0 On r0",
    "j dlaa",
  ].join("\n")
);
assert.equal(minify("# only a comment\n\n   \n"), "");
