import * as vscode from "vscode";

/** Open a file in an editor beside the current one. */
export async function showFile(uri: vscode.Uri): Promise<void> {
  await show(await vscode.workspace.openTextDocument(uri));
}

/** Open `content` in a new untitled editor beside the current one. */
export async function showUntitled(content: string): Promise<void> {
  await show(await vscode.workspace.openTextDocument({ content, language: "plaintext" }));
}

async function show(document: vscode.TextDocument): Promise<void> {
  await vscode.window.showTextDocument(document, vscode.ViewColumn.Beside);
}
