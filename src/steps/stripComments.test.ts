import { strict as assert } from "assert";
import { stripComments } from "./stripComments";

assert.deepEqual(
  stripComments(["# full line", "add r0 r0 1 # inline", 'define H HASH("a # b")']),
  ["", "add r0 r0 1 ", 'define H HASH("a # b")']
);
