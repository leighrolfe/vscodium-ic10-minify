import { strict as assert } from "assert";
import { compressDefines } from "./compressDefines";

// in order of definition, including use inside other defines
assert.deepEqual(
  compressDefines([
    "define Target 300",
    "define Margin 5",
    "define Limit Target",
    "sub r0 r1 Target",
    "slt r2 r0 Margin",
    "bgt r0 Limit main",
  ]),
  [
    "define daa 300",
    "define dab 5",
    "define dac daa",
    "sub r0 r1 daa",
    "slt r2 r0 dab",
    "bgt r0 dac main",
  ]
);

// skips names already in use
assert.deepEqual(
  compressDefines(["define daa 1", "define Foo 2", "add r0 daa Foo"]),
  ["define dab 1", "define dac 2", "add r0 dab dac"]
);
