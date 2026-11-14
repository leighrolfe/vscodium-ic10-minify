import { strict as assert } from "assert";
import { compressLabels } from "./compressLabels";

// definitions and references, in order of definition
assert.deepEqual(
  compressLabels([
    "main:",
    "yield",
    "jal pumpOn",
    "j main",
    "pumpOn:",
    "s d0 On 1",
    "j ra",
  ]),
  ["dlaa:", "yield", "jal dlab", "j dlaa", "dlab:", "s d0 On 1", "j ra"]
);

// label sharing a line with an instruction, and a forward reference
assert.deepEqual(
  compressLabels(["j end", "pumpOn: s d0 On 1", "end:"]),
  ["j dlab", "dlaa: s d0 On 1", "dlab:"]
);

// skips names already in use; quoted text untouched
assert.deepEqual(
  compressLabels(['alias T HASH("foo")', "dlaa:", "j dlaa", "foo:", "j foo"]),
  ['alias T HASH("foo")', "dlab:", "j dlab", "dlac:", "j dlac"]
);
