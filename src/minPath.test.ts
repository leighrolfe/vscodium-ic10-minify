import { strict as assert } from "assert";
import { minifiedPath } from "./minPath";

assert.equal(minifiedPath("/a/b/pump.ic10"), "/a/b/pump.min.ic10");
assert.equal(minifiedPath("/a/script.py"), "/a/script.min.py");
assert.equal(minifiedPath("/a/my.script.py"), "/a/my.script.min.py");
assert.equal(minifiedPath("/a/noext"), "/a/noext.min");
assert.equal(minifiedPath("pump.ic10"), "pump.min.ic10");
