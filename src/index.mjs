import os from 'os';
import { commandList } from './commands/index.mjs';
import { msg } from './messages/msg.mjs';

process.stdin.setEncoding('utf8');

export let currentWD = null;

try {
  const homeDirectory = os.homedir();
  process.chdir(homeDirectory);
  currentWD = process.cwd();
  msg.curDirMsg(currentWD);

  const args = process.argv;
  let localUsername = null;

  args.map((arg) => {
    console.log(arg);
    if (arg.includes('--username')) {
      localUsername = arg.split('=')[1].startsWith('"', 0)
        ? arg.split('=')[1].substring(1, arg.split('=')[1].indexOf('"', 1))
        : arg.split('=')[1];
    }
  });

  console.log(`Welcome to the File Manager, ${localUsername}!`)
  
  process.stdin.on('data', (data) => {
    const dataArray = data.trim().split(' ');
    const command = dataArray[0];
    const arg1 = dataArray[1];
    const arg2 = dataArray[2];
    const collectedArgs = dataArray.slice(1).join(' ');
    const uniArg = dataArray.length > 2 ? collectedArgs : arg1;
    switch (command) {
      case '.exit':
        commandList.close(localUsername);
        break;
      case 'add':
        commandList.add(uniArg);
        break;
      case 'rm':
        commandList.delete(`${currentWD}/${uniArg}`, currentWD);
        break;
      case 'up':
        commandList.up(currentWD);
        break;
      case 'cd':
        commandList.cd(uniArg, currentWD);
        break;
      case 'ls':
        commandList.list();
        break;
      case 'cat':
        commandList.cat(uniArg);
        break;
      case 'rn':
        commandList.rn(arg1, arg2);
        break;
      case 'cp':
        commandList.cp(arg1, arg2);
        break;
      case 'mv':
        commandList.cp(arg1, arg2);
        commandList.delete(arg1);
        break;

      case 'os':
        switch (arg1.substring(2).toLowerCase()) {
          case 'eol':
            commandList.eol();
            break;
          case 'cpus':
            commandList.cpus();
            break;
          case 'homedir':
            commandList.homedir();
            break;
          case 'username':
            commandList.username();
            break;
          case 'architecture':
            commandList.architecture();
            break;
          default:
            msg.invInp();
        }
        break;
      case 'hash':
        commandList.hash(uniArg);
        break;
      case 'compress':
        commandList.compress(arg1, arg2);
        break;
      case 'decompress':
        commandList.decompress(arg1, arg2);
        break;

      default:
        msg.invInp();
    }
  });

  process.on('SIGINT', () => {
    commandList.close(localUsername);
  });
} catch {
  msg.opFailed();
}
