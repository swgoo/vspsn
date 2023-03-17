import * as vscode from 'vscode';


const EXTENSION_NAME = 'copy-github-permalink';

type NormalizeGitUrl = (url: string) => {
  url: string;
  branch: string;
};

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    `${EXTENSION_NAME}.activate`,
    () => {
      
    }
  );

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
  // no-op
}