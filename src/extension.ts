import { window, commands, ExtensionContext, Uri, Disposable } from 'vscode';
import { showExcuteCmdBox, showVPCCmdBox, showBootStrapCmdBox, showSCMCmdBox} from './InputBox';
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
}
