import os from 'os';
import { commandList } from './commands/index.mjs';

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
  const dataArray = data.trim().split(' ');
  const command = dataArray[0];
  const arg1 = dataArray[1];
  if (command === '.exit') {
    commandList.close(localUsername);
  } else if (command === 'add') {
    commandList.add(arg1);
  }
  else {
    console.log(`Вы ввели: ${data.trim()}`);
    console.log(`You are currently in ${currentWorkingDirectory}`);
  }
});

process.on('SIGINT', () => {
  commandList.close(localUsername);
});

const currentWorkingDirectory = process.cwd();
console.log(`You are currently in ${currentWorkingDirectory}`);
