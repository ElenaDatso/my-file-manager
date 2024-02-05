import path from 'path';
import { msg } from '../../messages/msg.mjs';

export const cdCommand = (pathToGo, cwd) => {
  const normalPath = path.normalize(pathToGo);

  if (path.extname(normalPath)) {
    msg.invInp();
    return;
  }

  try {
    let newPath;
    if (path.isAbsolute(normalPath)) {
      newPath = normalPath;
    } else {
      newPath = path.join(cwd, normalPath);
    }
    process.chdir(newPath);
    msg.curDirMsg(process.cwd());
  } catch {
    msg.opFailed();
  }
};
