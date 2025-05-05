import * as os from 'os';
import { commandList } from './commands/index.mjs';
import { msg } from './messages/msg.mjs';

process.stdin.setEncoding('utf8');

let currentWD = null;

try {
  const homeDirectory = os.homedir();
  process.chdir(homeDirectory);
  currentWD = process.cwd();
  msg.curDirMsg(currentWD);

  const args = process.argv;
  let localUsername = null;

  args.forEach((arg) => {
    if (arg.startsWith('--username=')) {
      localUsername = arg.split('=')[1];
    }
  });

  console.log(`Welcome to the File Manager, ${localUsername}!`);

  process.stdin.on('data', async (data) => {
    const dataArray = data.trim().split(' ');
    const command = dataArray[0];
    const arg1 = dataArray[1];
    const arg2 = dataArray[2];
    const collectedArgs = dataArray.slice(1).join(' ');
    const uniArg = dataArray.length > 2 ? collectedArgs : arg1;

    try {
      switch (command) {
        case '.exit':
          commandList.close(localUsername);
          break;
        case 'add':
          await commandList.add(uniArg);
          break;
        case 'rm':
          await commandList.delete(`${currentWD}/${uniArg}`, currentWD);
          break;
        case 'up':
          currentWD = await commandList.up(currentWD);
          break;
        case 'cd':
          currentWD = await commandList.cd(uniArg, currentWD);
          break;
        case 'ls':
          await commandList.list(currentWD);
          break;
        case 'cat':
          await commandList.cat(uniArg);
          break;
        case 'rn':
          await commandList.rn(arg1, arg2);
          break;
        case 'cp':
          await commandList.cp(arg1, arg2);
          break;
        case 'mv':
          const success = await commandList.cp(arg1, arg2);
          if (success) {
            await commandList.delete(arg1);
          } else {
            msg.opFailed();
          }
          break;
        case 'os':
          switch (arg1?.substring(2).toLowerCase()) {
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
          await commandList.hash(uniArg);
          break;
        case 'compress':
          await commandList.compress(arg1, arg2);
          break;
        case 'decompress':
          await commandList.decompress(arg1, arg2);
          break;
        default:
          msg.invInp();
      }
    } catch {
      msg.opFailed();
    }
  });

  process.on('SIGINT', () => {
    commandList.close(localUsername);
  });
} catch {
  msg.opFailed();
}
