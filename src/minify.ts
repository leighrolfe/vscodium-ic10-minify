import { Step } from "./step";
import { stripComments } from "./steps/stripComments";
import { stripWhitespace } from "./steps/stripWhitespace";
import { inlineRegisterAliases } from "./steps/inlineRegisterAliases";
import { inlineDeviceAliases } from "./steps/inlineDeviceAliases";
import { compressDefines } from "./steps/compressDefines";

/** Steps run in this order. */
const STEPS: Step[] = [
  stripComments,
  stripWhitespace,
  inlineRegisterAliases,
  inlineDeviceAliases,
  compressDefines,
];

export function minify(source: string): string {
  return STEPS.reduce<string[]>(
    (lines, step) => step(lines),
    source.split(/\r\n|\r|\n/)
  ).join("\n");
}
