import fs from 'fs';
import { msg } from '../../messages/msg.mjs';

export const deleteCommand = (pathToFile, curWD) => {
  try {
    fs.rm(pathToFile, () => {
      console.log(
        `The file was succsfully removed. /n You are currently in ${curWD}}`
      );
    });
    msg.curDirMsg(process.cwd());
  } catch {
    msg.opFailed();
  }

};
