import { strict as assert } from "assert";
import { inlineRegisterAliases } from "./inlineRegisterAliases";

// inlines, follows chains, keeps device and HASH aliases, ignores quoted text
assert.deepEqual(
  inlineRegisterAliases([
    "alias Temp r0",
    "alias Err r1",
    "alias A r2",
    "alias B A",
    "alias Pump d0",
    'alias Tank HASH("Temp")',
    "sub Err Temp B",
    "s Pump On Err",
  ]),
  ["alias Pump d0", 'alias Tank HASH("Temp")', "sub r1 r0 r2", "s Pump On r1"]
);

// redefinition
assert.deepEqual(
  inlineRegisterAliases(["alias X r0", "add X X 1", "alias X r1", "add X X 1"]),
  ["add r0 r0 1", "add r1 r1 1"]
);

// redefinition as a non-register stops inlining
assert.deepEqual(
  inlineRegisterAliases(["alias X r0", "alias X d0", "add X X 1"]),
  ["alias X d0", "add X X 1"]
);
