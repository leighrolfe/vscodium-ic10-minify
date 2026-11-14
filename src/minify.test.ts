import { strict as assert } from "assert";
import { minify } from "./minify";

const input = [
  "# Header comment",
  "",
  "alias   Pump \t d0   # inline comment",
  "define Hash HASH(\"Tank # 1\")",
  "main:",
  "    yield",
  "    s Pump On 1   ",
  "    j main",
  "",
].join("\r\n");

const expected = [
  "alias Pump d0",
  "define Hash HASH(\"Tank # 1\")",
  "main:",
  "yield",
  "s Pump On 1",
  "j main",
].join("\n");

assert.equal(minify(input), expected);
assert.equal(minify("# only a comment\n\n   \n"), "");
console.log("minify tests passed");
