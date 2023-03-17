/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { window, Uri} from 'vscode';
import * as path from 'path';

/**
 * Shows a pick list using window.showQuickPick().
 */
export async function showQuickPick() {
	let i = 0;
	const result = await window.showQuickPick(['eins', 'zwei', 'drei'], {
		placeHolder: 'eins, zwei or drei',
		onDidSelectItem: item => window.showInformationMessage(`Focus ${++i}: ${item}`)
	});
	window.showInformationMessage(`Got: ${result}`);
}

interface FilePath{
	dir : String;
	name: String;
	ext: String;
}

/**
 * Shows an input box using window.showInputBox().
 */
function getDirNameExtFromAcriveTextEditor(uri : Uri): FilePath | undefined {
	const fpath = uri.fsPath;
	if (fpath === undefined) {
		window.showInformationMessage(`open a mod file`);
		return;
	}
	const fext = path.extname(fpath);
	const fname = path.basename(fpath, fext);
	const fdir = path.dirname(fpath);
	
	const result : FilePath= { 
		dir: fdir,
		name: fname,
		ext: fext
	};
	return result;
}

function openTerminal(name: string, cwd: string, cmd: string) {
	const psnTerminal = window.createTerminal({name: `PsN Terminal: ${cmd}`, cwd: cwd});
	psnTerminal.sendText(cmd);
	psnTerminal.show();
}

export async function showExcuteCmdBox(uri : Uri) {
	const fp = getDirNameExtFromAcriveTextEditor(uri);
	if (fp === undefined){return;}

	if (fp.ext !== '.mod' ) {
		window.showInformationMessage(`${fp.dir}/${fp.name}${fp.ext} is not a mod file`);
		return;
	}

	const defaultCmdList = [];
	defaultCmdList.push('execute');
	defaultCmdList.push([fp.name, fp.ext].join(''));
	const defaultCmd = defaultCmdList.join(' ');

	const inputCmd = await window.showInputBox({
		value: defaultCmd,
		placeHolder: 'PsN Command',
		title: 'PsN Command'
	});

	if (inputCmd === undefined) {
		return;
	}
	openTerminal(inputCmd, fp.dir.toString(), inputCmd);
};

export async function showVPCCmdBox(uri : Uri) {
	const fp = getDirNameExtFromAcriveTextEditor(uri);
	if (fp === undefined){return;}

	if (fp.ext !== '.mod' ) {
		window.showInformationMessage(`${fp.dir}/${fp.name}${fp.ext} is not a mod file`);
		return;
	}
	

	const defaultCmdList = [];
	defaultCmdList.push('vpc -samples=200 -auto_bin=auto');
	defaultCmdList.push(`-dir=vpc_${fp.name}`);
	defaultCmdList.push([fp.name, fp.ext].join(''));
	const defaultCmd = defaultCmdList.join(' ');

	const cmd = await window.showInputBox({
		value: defaultCmd,
		placeHolder: 'psn execute cmd',
	});

	if (cmd === undefined) {
		return;
	}
	openTerminal(cmd, fp.dir.toString(), cmd);
};

export async function showBootStrapCmdBox(uri: Uri) {
	const fp = getDirNameExtFromAcriveTextEditor(uri);
	if (fp === undefined){return;}

	if (fp.ext !== '.mod' ) {
		window.showInformationMessage(`${fp.dir}/${fp.name}${fp.ext} is not a mod file`);
		return;
	}
	

	const defaultCmdList = [];
	defaultCmdList.push('bootstrap -samples=50 -threads=4');
	defaultCmdList.push(`-dir=bs_${fp.name}`);
	defaultCmdList.push([fp.name, fp.ext].join(''));
	const defaultCmd = defaultCmdList.join(' ');

	const cmd = await window.showInputBox({
		value: defaultCmd,
		placeHolder: 'psn execute cmd',
	});

	if (cmd === undefined) {
		return;
	}
	openTerminal(cmd, fp.dir.toString(), cmd);
};

export async function showSCMCmdBox(uri : Uri) {
	const fp = getDirNameExtFromAcriveTextEditor(uri);
	if (fp === undefined){return;}

	if (fp.ext !== '.mod' ) {
		window.showInformationMessage(`${fp.dir}/${fp.name}${fp.ext} is not a mod file`);
		return;
	}
	

	const defaultCmdList = [];
	defaultCmdList.push(`scm -config_file=${fp.name}.scm`);
	defaultCmdList.push(`-model=${fp.name}${fp.ext}`);
	const defaultCmd = defaultCmdList.join(' ');

	const cmd = await window.showInputBox({
		value: defaultCmd,
		placeHolder: 'psn execute cmd',
	});

	if (cmd === undefined) {
		return;
	}
	openTerminal(cmd, fp.dir.toString(), cmd);
};