/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { window } from 'vscode';
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
async function getDirNameExtFromAcriveTextEditor(): Promise<FilePath | undefined> {
	const fpath = await window.activeTextEditor?.document.fileName;
	if (fpath === undefined) {return;}
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

export async function showExcuteCmdBox() {
	const fp = await getDirNameExtFromAcriveTextEditor();
	if (fp === undefined){return;}

	if (fp.ext !== '.mod' ) {
		window.showInformationMessage(`${fp.dir}/${fp.name}${fp.ext} is not a mod file`);
		return;
	}

	const cmdList = [];
	cmdList.push('execute');
	cmdList.push([fp.name, fp.ext].join(''));
	const cmdstr = cmdList.join(' ');

	const result = await window.showInputBox({
		value: cmdstr,
		placeHolder: 'psn execute cmd',
	});

	if (result === undefined) {
		return;
	}
	const psnTerminal = window.createTerminal({name: 'psn terminal', cwd: fp.dir.toString()});
	psnTerminal.sendText(result);
	psnTerminal.show();
};

export async function showVPCCmdBox() {
	const fp = await getDirNameExtFromAcriveTextEditor();
	if (fp === undefined){return;}

	if (fp.ext !== '.mod' ) {
		window.showInformationMessage(`${fp.dir}/${fp.name}${fp.ext} is not a mod file`);
		return;
	}
	

	const cmdList = [];
	cmdList.push('vpc -samples=200 -auto_bin=auto');
	cmdList.push(`-dir=vpc_${fp.name}`);
	cmdList.push([fp.name, fp.ext].join(''));
	const cmdstr = cmdList.join(' ');

	const result = await window.showInputBox({
		value: cmdstr,
		placeHolder: 'psn execute cmd',
	});

	if (result === undefined) {
		return;
	}
	const psnTerminal = window.createTerminal({name: 'psn terminal', cwd: fp.dir.toString()});
	psnTerminal.sendText(result);
	psnTerminal.show();
};

export async function showBootStrapCmdBox() {
	const fp = await getDirNameExtFromAcriveTextEditor();
	if (fp === undefined){return;}

	if (fp.ext !== '.mod' ) {
		window.showInformationMessage(`${fp.dir}/${fp.name}${fp.ext} is not a mod file`);
		return;
	}
	

	const cmdList = [];
	cmdList.push('bootstrap -samples=50 -threads=4');
	cmdList.push(`-dir=bs_${fp.name}`);
	cmdList.push([fp.name, fp.ext].join(''));
	const cmdstr = cmdList.join(' ');

	const result = await window.showInputBox({
		value: cmdstr,
		placeHolder: 'psn execute cmd',
	});

	if (result === undefined) {
		return;
	}
	const psnTerminal = window.createTerminal({name: 'psn terminal', cwd: fp.dir.toString()});
	psnTerminal.sendText(result);
	psnTerminal.show();
};

export async function showSCMCmdBox() {
	const fp = await getDirNameExtFromAcriveTextEditor();
	if (fp === undefined){return;}

	if (fp.ext !== '.mod' ) {
		window.showInformationMessage(`${fp.dir}/${fp.name}${fp.ext} is not a mod file`);
		return;
	}
	

	const cmdList = [];
	cmdList.push(`scm -config_file=${fp.name}.scm`);
	cmdList.push(`-model=${fp.name}${fp.ext}`);
	const cmdstr = cmdList.join(' ');

	const result = await window.showInputBox({
		value: cmdstr,
		placeHolder: 'psn execute cmd',
	});

	if (result === undefined) {
		return;
	}
	const psnTerminal = window.createTerminal({name: 'psn terminal', cwd: fp.dir.toString()});
	psnTerminal.sendText(result);
	psnTerminal.show();
};