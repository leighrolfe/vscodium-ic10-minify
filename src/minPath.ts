import * as path from "path";

/** Insert `.min` before the extension: foo/bar.ic10 -> foo/bar.min.ic10, foo/bar -> foo/bar.min */
export function minifiedPath(filePath: string): string {
  const { dir, name, ext } = path.posix.parse(filePath);
  return path.posix.join(dir, `${name}.min${ext}`);
}
