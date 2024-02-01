import os from 'os';
import { closeEvent } from './commands/close.mjs';
process.stdin.setEncoding('utf8');

const homeDirectory = os.homedir();
process.chdir(homeDirectory);

const args = process.argv;
let localUsername = null;

args.map((arg) => {
  console.log(arg);
  if (arg.includes('--')) localUsername = arg.split('=')[1];
});

console.log(`Welcome to the File Manager, ${localUsername}!`);

process.stdin.on('data', (data) => {
  if (data.trim() === '.exit') {
    closeEvent(localUsername);
  } else {
    console.log(`Вы ввели: ${data.trim()}`);
    console.log(`You are currently in ${currentWorkingDirectory}`);
  }
});

process.on('SIGINT', () => {
  closeEvent(localUsername);
});

const currentWorkingDirectory = process.cwd();
console.log(`You are currently in ${currentWorkingDirectory}`);
