import { window, commands, ExtensionContext, Uri, Disposable } from 'vscode';
import { showExcuteCmdBox, showVPCCmdBox, showBootStrapCmdBox, showSCMCmdBox} from './InputBox';
// import { multiStepInput } from './multiStepInput';
// import { quickOpen } from './quickOpen';

export function activate(context: ExtensionContext) {
	// let disposable2 = commands.registerCommand('vspsn.root', async () => {
	// 	const options: { [key: string]: (context: ExtensionContext) => Promise<void>; } = {
	// 		execute : showExcuteCmdBox,
	// 		vpc : showVPCCmdBox,
	// 		bootstrap: showBootStrapCmdBox,
	// 		scm: showSCMCmdBox
	// 	};
	// 	const quickPick = window.createQuickPick();
	// 	quickPick.items = Object.keys(options).map(label => ({ label }));
	// 	quickPick.onDidChangeSelection(selection => {
	// 		if (selection[0]) {
	// 			options[selection[0].label](context)
	// 				.catch(console.error);
	// 		}
	// 	});
	// 	quickPick.onDidHide(() => quickPick.dispose());
	// 	quickPick.show();
	// });
	let disposables : Disposable[] = [];
	var disposable = commands.registerCommand('vspsn.execute', async (uri:Uri) => {
		showExcuteCmdBox(uri);
	  });
	disposables.push(disposable);

	disposable = commands.registerCommand('vspsn.diagnostics.vpc', async (uri:Uri) => {
		showVPCCmdBox(uri);
	  });
	disposables.push(disposable);

	disposable = commands.registerCommand('vspsn.diagnostics.bootstrap', async (uri:Uri) => {
		showBootStrapCmdBox(uri);
	  });
	disposables.push(disposable);

	disposable = commands.registerCommand('vspsn.covariates.scm', async (uri:Uri) => {
		showSCMCmdBox(uri);
	  });
	disposables.push(disposable);
	

	context.subscriptions.push(...disposables);
}
