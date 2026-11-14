import { Step } from "../step";
import { inlineAliases } from "./inlineAliases";

const REGISTER = /^(r(1[0-5]|[0-9])|ra|sp)$/;

/** Replace aliases of r0-r15, ra and sp with the register itself. */
export const inlineRegisterAliases: Step = (lines) =>
  inlineAliases(lines, (target) => REGISTER.test(target));
