import * as vscode from "vscode";
import { copyMinified } from "./commands/copyMinified";
import { openMinified } from "./commands/openMinified";
import { registerEditorCommand } from "./editor";

export function activate(context: vscode.ExtensionContext): void {
  context.subscriptions.push(
    registerEditorCommand("ic10Minify.openMinified", openMinified),
    registerEditorCommand("ic10Minify.copyMinified", copyMinified)
  );
}

export function deactivate(): void {}
