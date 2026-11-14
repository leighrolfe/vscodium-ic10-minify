import * as vscode from "vscode";
import { minifyEditor } from "../editor";
import { minifiedUri, writeMinifiedFile } from "../minifiedFile";
import { showFile, showUntitled } from "../openDocument";

/**
 * Saved file: write `name.min.ext` beside it (asking before overwriting) and open it.
 * Untitled file, or the user declined / the write failed: open an untitled editor.
 */
export async function openMinified(editor: vscode.TextEditor): Promise<void> {
  const content = minifyEditor(editor);
  const target = minifiedUri(editor.document);

  if (target && (await writeMinifiedFile(target, content))) {
    await showFile(target);
  } else {
    await showUntitled(content);
  }
}
