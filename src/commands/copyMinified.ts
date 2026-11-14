import * as vscode from "vscode";
import { minifyEditor } from "../editor";

export async function copyMinified(editor: vscode.TextEditor): Promise<void> {
  await vscode.env.clipboard.writeText(minifyEditor(editor));
}
