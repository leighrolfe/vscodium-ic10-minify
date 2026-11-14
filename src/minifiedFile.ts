import * as path from "path";
import * as vscode from "vscode";
import { minifiedPath } from "./minPath";

/**
 * Where the minified copy of `document` should be saved (`name.min.ext` next to it),
 * or undefined for untitled documents and locations that can't be written to.
 */
export function minifiedUri(document: vscode.TextDocument): vscode.Uri | undefined {
  if (
    document.isUntitled ||
    vscode.workspace.fs.isWritableFileSystem(document.uri.scheme) !== true
  ) {
    return undefined;
  }
  return document.uri.with({ path: minifiedPath(document.uri.path) });
}

/**
 * Write `content` to `uri`, asking before overwriting an existing file.
 * Returns false if the user declined or the write failed.
 */
export async function writeMinifiedFile(
  uri: vscode.Uri,
  content: string
): Promise<boolean> {
  if ((await exists(uri)) && !(await confirmOverwrite(uri))) {
    return false;
  }
  try {
    await vscode.workspace.fs.writeFile(uri, new TextEncoder().encode(content));
    return true;
  } catch (err) {
    const reason = err instanceof Error ? err.message : String(err);
    vscode.window.showErrorMessage(
      `IC10 Minify: could not write ${path.posix.basename(uri.path)} (${reason}). ` +
        "Opening an untitled editor instead."
    );
    return false;
  }
}

async function exists(uri: vscode.Uri): Promise<boolean> {
  try {
    await vscode.workspace.fs.stat(uri);
    return true;
  } catch {
    return false;
  }
}

async function confirmOverwrite(uri: vscode.Uri): Promise<boolean> {
  const choice = await vscode.window.showWarningMessage(
    `${path.posix.basename(uri.path)} already exists. Overwrite it?`,
    {
      modal: true,
      detail: "Cancel to open the minified code in an untitled editor.",
    },
    "Overwrite"
  );
  return choice === "Overwrite";
}
