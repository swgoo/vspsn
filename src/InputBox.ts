import { window, Uri, workspace, ExtensionContext, env} from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

// interface FilePath{
// 	dir : String;
// 	name: String;
// 	ext: String;
// }

// function getDirNameExt(uri : Uri): FilePath {
// 	const fpath = uri.fsPath;
// 	const fext = path.extname(fpath);
// 	const fname = path.basename(fpath, fext);
// 	const fdir = path.dirname(fpath);
	
// 	return { 
// 		dir: fdir,
// 		name: fname,
// 		ext: fext
// 	};
// }

function openTerminal(cwd: string, cmd: string) {
	const psnTerminal = window.createTerminal({name: `PsN Terminal: ${cmd}`, cwd: cwd});
	psnTerminal.sendText(cmd);
	psnTerminal.show();
}

export async function showExcuteCmdBox(uri : Uri) {
	const defaultCmdList = [];
	defaultCmdList.push('execute');
	defaultCmdList.push(`${path.basename(uri.fsPath)}`);
	const defaultCmd = defaultCmdList.join(' ');

	const inputCmd = await window.showInputBox({
		value: defaultCmd,
		placeHolder: 'PsN Command',
		title: 'PsN Command'
	});

	if (inputCmd === undefined) {return;}
	openTerminal(path.dirname(uri.fsPath), inputCmd);
};

export async function showVPCCmdBox(uri : Uri) {	
	const defaultCmdList = [];
	defaultCmdList.push('vpc -samples=200 -auto_bin=auto');
	defaultCmdList.push(`-dir=vpc_${path.basename(uri.fsPath, path.extname(uri.fsPath))}`);
	defaultCmdList.push(`${path.basename(uri.fsPath)}`);
	const defaultCmd = defaultCmdList.join(' ');

	const inputCmd = await window.showInputBox({
		value: defaultCmd,
		placeHolder: 'psn execute cmd',
	});

	if (inputCmd === undefined) {return;}
	openTerminal(path.dirname(uri.fsPath), inputCmd);
};

export async function showBootStrapCmdBox(uri: Uri) {
	const defaultCmdList = [];
	defaultCmdList.push('bootstrap -samples=50 -threads=4');
	defaultCmdList.push(`-dir=bs_${path.basename(uri.fsPath, path.extname(uri.fsPath))}`);
	defaultCmdList.push(`${path.basename(uri.fsPath)}`);
	const defaultCmd = defaultCmdList.join(' ');

	const inputCmd = await window.showInputBox({
		value: defaultCmd,
		placeHolder: 'psn execute cmd',
	});

	if (inputCmd === undefined) {return;}
	openTerminal(path.dirname(uri.fsPath).toString(), inputCmd);
};

export async function showSCMCmdBox(uri : Uri, context : ExtensionContext) {

	const modFileName = path.basename(uri.fsPath, path.extname(uri.fsPath));
	const existScm = fs.existsSync(`${uri.fsPath.replace('.mod', '')}.scm`);
	if (!existScm) {
		window.showErrorMessage('scm config file is not exist.');
		
		const result = await window.showQuickPick(['yes', 'no'], {
			placeHolder: 'yes/no',
			title: 'Create .scm File'
		});
		
		if (result === 'yes') {
			const resourcePath = Uri.joinPath(context.extensionUri, 'resources', 'template.scm');
			const createdSCMPath = uri.fsPath.replace('.mod', '.scm');
			fs.copyFileSync(resourcePath.fsPath, createdSCMPath);
			window.showInformationMessage(`please edit ${modFileName}.scm`);
			window.showTextDocument(Uri.file(createdSCMPath));
		} else {
			window.showInformationMessage("you can get a scm file from the link", 'Open Link')
			.then(selection => {
				if (selection === 'Open Link') {
					env.openExternal(Uri.parse('https://uupharmacometrics.github.io/PsN/docs.html'));
				}
			});
		} 
		
		return;
	}


	const defaultCmdList = [];
	defaultCmdList.push(`scm -config_file=${modFileName}.scm`);
	defaultCmdList.push(`-model=${path.basename(uri.fsPath)}`);
	const defaultCmd = defaultCmdList.join(' ');

	const inputCmd = await window.showInputBox({
		value: defaultCmd,
		placeHolder: 'psn execute cmd',
	});

	if (inputCmd === undefined) {return;}
	openTerminal(path.dirname(uri.fsPath), inputCmd);
};