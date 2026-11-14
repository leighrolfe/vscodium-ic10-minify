import * as vscode from "vscode";
import { minify } from "./minify";

/** The active editor, or undefined (with a warning) if there isn't one. */
export function getEditor(): vscode.TextEditor | undefined {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    vscode.window.showWarningMessage("IC10 Minify: no active editor.");
  }
  return editor;
}

/** Register a command whose handler receives the active editor. */
export function registerEditorCommand(
  command: string,
  handler: (editor: vscode.TextEditor) => unknown
): vscode.Disposable {
  return vscode.commands.registerCommand(command, async () => {
    const editor = getEditor();
    if (editor) {
      await handler(editor);
    }
  });
}

/** Minify the selection, or the whole document if nothing is selected. */
export function minifyEditor(editor: vscode.TextEditor): string {
  const { document, selection } = editor;
  const source = selection.isEmpty ? document.getText() : document.getText(selection);
  const result = minify(source);
  vscode.window.setStatusBarMessage(
    `IC10 Minify: ${source.length} → ${result.length} characters, ` +
      `${result === "" ? 0 : result.split("\n").length} lines`,
    5000
  );
  return result;
}
