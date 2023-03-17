import { window, Uri} from 'vscode';
import * as path from 'path';

interface FilePath{
	dir : String;
	name: String;
	ext: String;
}

/**
 * Shows an input box using window.showInputBox().
 */
function getDirNameExt(uri : Uri): FilePath {
	const fpath = uri.fsPath;
	const fext = path.extname(fpath);
	const fname = path.basename(fpath, fext);
	const fdir = path.dirname(fpath);
	
	return { 
		dir: fdir,
		name: fname,
		ext: fext
	};
}

function openTerminal(cwd: string, cmd: string) {
	const psnTerminal = window.createTerminal({name: `PsN Terminal: ${cmd}`, cwd: cwd});
	psnTerminal.sendText(cmd);
	psnTerminal.show();
}

export async function showExcuteCmdBox(uri : Uri) {
	const fp = getDirNameExt(uri);

	const defaultCmdList = [];
	defaultCmdList.push('execute');
	defaultCmdList.push([fp.name, fp.ext].join(''));
	const defaultCmd = defaultCmdList.join(' ');

	const inputCmd = await window.showInputBox({
		value: defaultCmd,
		placeHolder: 'PsN Command',
		title: 'PsN Command'
	});

	if (inputCmd === undefined) {return;}
	openTerminal(fp.dir.toString(), inputCmd);
};

export async function showVPCCmdBox(uri : Uri) {
	const fp = getDirNameExt(uri);
	
	const defaultCmdList = [];
	defaultCmdList.push('vpc -samples=200 -auto_bin=auto');
	defaultCmdList.push(`-dir=vpc_${fp.name}`);
	defaultCmdList.push([fp.name, fp.ext].join(''));
	const defaultCmd = defaultCmdList.join(' ');

	const inputCmd = await window.showInputBox({
		value: defaultCmd,
		placeHolder: 'psn execute cmd',
	});

	if (inputCmd === undefined) {return;}
	openTerminal(fp.dir.toString(), inputCmd);
};

export async function showBootStrapCmdBox(uri: Uri) {
	const fp = getDirNameExt(uri);

	const defaultCmdList = [];
	defaultCmdList.push('bootstrap -samples=50 -threads=4');
	defaultCmdList.push(`-dir=bs_${fp.name}`);
	defaultCmdList.push([fp.name, fp.ext].join(''));
	const defaultCmd = defaultCmdList.join(' ');

	const inputCmd = await window.showInputBox({
		value: defaultCmd,
		placeHolder: 'psn execute cmd',
	});

	if (inputCmd === undefined) {return;}
	openTerminal(fp.dir.toString(), inputCmd);
};

export async function showSCMCmdBox(uri : Uri) {
	const fp = getDirNameExt(uri);
	if (fp === undefined){return;}

	const defaultCmdList = [];
	defaultCmdList.push(`scm -config_file=${fp.name}.scm`);
	defaultCmdList.push(`-model=${fp.name}${fp.ext}`);
	const defaultCmd = defaultCmdList.join(' ');

	const inputCmd = await window.showInputBox({
		value: defaultCmd,
		placeHolder: 'psn execute cmd',
	});

	if (inputCmd === undefined) {return;}
	openTerminal(fp.dir.toString(), inputCmd);
};