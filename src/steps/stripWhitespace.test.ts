import { strict as assert } from "assert";
import { stripWhitespace } from "./stripWhitespace";

assert.deepEqual(
  stripWhitespace(["  add   r0 \t r0 1  ", "", "   ", '  x "p  q"  ']),
  ["add r0 r0 1", 'x "p  q"']
);
