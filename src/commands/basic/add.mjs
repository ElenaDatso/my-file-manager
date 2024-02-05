import fs from 'fs';
import path from 'path';
import { msg } from '../../messages/msg.mjs';


export const addCommand = (fileName) => {
  const currentWD = process.cwd();
  const filePath = path.join(currentWD, fileName);
  fs.writeFile(filePath, '', (err) => {
  if (err) {
    msg.opFailed();
  } else {
    console.log(`Success! The file is created /n You are currently in ${currentWD}`);
  }
});
}
