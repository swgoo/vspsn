import { window, Uri, workspace, ExtensionContext, env} from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import * as https from 'https';

function openTerminal(cwd: string, cmd: string) {
	const psnTerminal = window.createTerminal({name: `PsN Terminal: ${cmd}`, cwd: cwd});
	psnTerminal.sendText(cmd);
	psnTerminal.show();
}

function checkUri(uri: Uri): Uri{
	const activeUri = window.activeTextEditor?.document.uri;
	if (uri === undefined && activeUri !== undefined) {
		return activeUri;
	} else {
		return uri;
	}
} 

export async function showExcuteCmdBox(uri : Uri) {

	var uri = checkUri(uri);
	if (uri === undefined) {return;}
	
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

	var uri = checkUri(uri);
	if (uri === undefined) {return;}

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
	var uri = checkUri(uri);
	if (uri === undefined) {return;}

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

export async function showSCMCmdBox(uri : Uri) {
	var uri = checkUri(uri);
	if (uri === undefined) {return;}

	const modFileName = path.basename(uri.fsPath, path.extname(uri.fsPath));
	const existScm = fs.existsSync(`${uri.fsPath.replace('.mod', '')}.scm`);
	if (!existScm) {
		const input = await window.showQuickPick(['yes', 'no'], {
			placeHolder: 'yes, y or no, n',
			title: 'Create .scm File'
		});
		
		if (input === 'yes' || 'y') {
			const scmUrl = "https://raw.githubusercontent.com/UUPharmacometrics/PsN/master/doc/config_template_standard.scm";
			const createdSCMPath = uri.fsPath.replace('.mod', '.scm');

			https.get(scmUrl, (response) => {
				// Create a write stream to save the file
				const fileStream = fs.createWriteStream(createdSCMPath);
			  
				// Pipe the response to the write stream
				response.pipe(fileStream);
			  
				// When the download is complete, close the write stream
				response.on('end', () => {
				  fileStream.close();
				  window.showTextDocument(Uri.file(createdSCMPath));
				});
			  }).on('error', (error) => {
				console.error(`Error downloading file: ${error}`);
			  });

			window.showInformationMessage(`please edit ${modFileName}.scm. and you can read a document about scm module from the link`, 'Open Link')
			.then(selection => {
				if (selection === 'Open Link') {
					env.openExternal(Uri.parse('https://github.com/UUPharmacometrics/PsN/releases/latest/download/scm_userguide.pdf'));
				}
			});
		} else {
			window.showInformationMessage("you can get a scm file from the link", 'Open Link')
			.then(selection => {
				if (selection === 'Open Link') {
					env.openExternal(Uri.parse('https://github.com/UUPharmacometrics/PsN/tree/master/doc'));
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