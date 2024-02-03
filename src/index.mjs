import os from 'os';
import { commandList } from './commands/index.mjs';
import { msg } from './helpers/curDirMsg.mjs';

process.stdin.setEncoding('utf8');

const homeDirectory = os.homedir();
process.chdir(homeDirectory);

const args = process.argv;
let localUsername = null;

args.map((arg) => {
  console.log(arg);
  if (arg.includes('--username')) localUsername = arg.split('=')[1];
});
console.log(`Welcome to the File Manager, ${localUsername}!`);

process.stdin.on('data', (data) => {
  let currentWD = process.cwd();
  const dataArray = data.trim().split(' ');
  const command = dataArray[0];
  const arg1 = dataArray[1];
  const arg2 = dataArray[2];
  switch (command) {
    case ('.exit'):
      commandList.close(localUsername);
       msg(currentWD);
       break;
    case ('add'):
      commandList.add(arg1);
      msg(currentWD);
      break;
    case ('rm'):
      commandList.delete(`${currentWD}/${arg1}`, currentWD);
      msg(currentWD);
      break;
    case ('up'):
      commandList.up(currentWD);
      currentWD = process.cwd();
      msg(currentWD);
      break;
    case ('cd'):
      commandList.cd(arg1, currentWD);
      currentWD = process.cwd();
      msg(currentWD);
      break;
    case ('ls'):
      commandList.list(currentWD);
      msg(currentWD);
      break;
    case ('cat'):
      commandList.cat(arg1);
      msg(currentWD);
      break;
    case ('rn'):
      commandList.rn(arg1, arg2);
      msg(currentWD);
      break;
    case ('cp'):
      commandList.cp(arg1, arg2);
      msg(currentWD);
      break;
    case ('mv'):
      commandList.cp(arg1, arg2);
      commandList.delete(arg1);
      msg(currentWD);
      break;
    default:
      console.log('Unknown command');
  }
  }
);

process.on('SIGINT', () => {
  commandList.close(localUsername);
});

const currentWorkingDirectory = process.cwd();
console.log(`You are currently in ${currentWorkingDirectory}`);
