import { Step } from "../step";
import { inlineAliases } from "./inlineAliases";

const DEVICE = /^(d[0-5]|db)$/;

/** Replace aliases of d0-d5 and db with the device itself. */
export const inlineDeviceAliases: Step = (lines) =>
  inlineAliases(lines, (target) => DEVICE.test(target));
