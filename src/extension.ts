import { window, commands, ExtensionContext, Uri, Disposable, workspace, } from 'vscode';
import { showExcuteCmdBox, showVPCCmdBox, showBootStrapCmdBox, showSCMCmdBox} from './InputBox';
import {NodeDependenciesProvider} from './treeView';
// import { multiStepInput } from './multiStepInput';
// import { quickOpen } from './quickOpen';

export function activate(context: ExtensionContext) {
	let disposables : Disposable[] = [];
	var disposable = commands.registerCommand('vspsn.execute', (uri:Uri) => {
		showExcuteCmdBox(uri);
	  });
	disposables.push(disposable);

	disposable = commands.registerCommand('vspsn.diagnostics.vpc', (uri:Uri) => {
		showVPCCmdBox(uri);
	  });
	disposables.push(disposable);

	disposable = commands.registerCommand('vspsn.diagnostics.bootstrap', (uri:Uri) => {
		showBootStrapCmdBox(uri);
	  });
	disposables.push(disposable);

	disposable = commands.registerCommand('vspsn.covariates.scm', (uri:Uri) => {
		showSCMCmdBox(uri);
	  });
	disposables.push(disposable);
	

	context.subscriptions.push(...disposables);

	const rootPath =
		workspace.workspaceFolders && workspace.workspaceFolders.length > 0
				? workspace.workspaceFolders[0].uri.fsPath
				: undefined;
	window.registerTreeDataProvider(
		'vspsn-explore',
		new NodeDependenciesProvider(rootPath)
		);
	window.createTreeView('vspsn-explore', {
			treeDataProvider: new NodeDependenciesProvider(rootPath)
		});
}
