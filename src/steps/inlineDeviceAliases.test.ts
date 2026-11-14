import { strict as assert } from "assert";
import { inlineDeviceAliases } from "./inlineDeviceAliases";

assert.deepEqual(
  inlineDeviceAliases([
    "alias Pump d0",
    "alias Sensor db",
    "alias Temp r0",
    "s Pump On 1",
    "l Temp Sensor Temperature",
  ]),
  ["alias Temp r0", "s d0 On 1", "l Temp db Temperature"]
);

assert.deepEqual(
  inlineDeviceAliases(["alias Dev d0", "s Dev On 1", "alias Dev d1", "s Dev On 0"]),
  ["s d0 On 1", "s d1 On 0"]
);
