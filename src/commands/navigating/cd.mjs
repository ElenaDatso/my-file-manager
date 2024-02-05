import path from 'path';
import { msg } from '../../messages/msg.mjs';

export const cdCommand = (pathToGo, cwd) => {
  const normalPath = path.normalize(pathToGo);

  if (path.extname(normalPath)) {
    msg.invInp();
    return;
  }
  try {
    if (path.isAbsolute(normalPath)) {
      process.chdir(normalPath);
      msg.curDirMsg(normalPath);
    } else {
      const relativePath = path.relative(cwd, normalPath);
      process.chdir(relativePath);
      msg.curDirMsg(relativePath);
    }
  } catch {
    msg.opFailed();
  }
};
