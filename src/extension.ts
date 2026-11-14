import * as vscode from "vscode";
import { minify } from "./minify";

function getMinified(): string | undefined {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    vscode.window.showWarningMessage("IC10 Minify: no active editor.");
    return undefined;
  }
  const doc = editor.document;
  const sel = editor.selection;
  const source = sel.isEmpty ? doc.getText() : doc.getText(sel);
  const result = minify(source);
  vscode.window.setStatusBarMessage(
    `IC10 Minify: ${source.length} → ${result.length} characters, ` +
      `${result === "" ? 0 : result.split("\n").length} lines`,
    5000
  );
  return result;
}

export function activate(context: vscode.ExtensionContext): void {
  context.subscriptions.push(
    vscode.commands.registerCommand("ic10Minify.openMinified", async () => {
      const result = getMinified();
      if (result === undefined) {
        return;
      }
      const doc = await vscode.workspace.openTextDocument({
        content: result,
        language: "plaintext",
      });
      await vscode.window.showTextDocument(doc, vscode.ViewColumn.Beside);
    }),
    vscode.commands.registerCommand("ic10Minify.copyMinified", async () => {
      const result = getMinified();
      if (result === undefined) {
        return;
      }
      await vscode.env.clipboard.writeText(result);
    })
  );
}

export function deactivate(): void {}
