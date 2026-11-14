/** A minification step: takes the program as lines, returns the transformed lines. */
export type Step = (lines: string[]) => string[];
