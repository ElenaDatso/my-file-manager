import { msg } from '../../messages/msg.mjs';

export const upCommand = () => {
  try {
    const curWD = process.cwd();
    const newPath = curWD.slice(0, curWD.lastIndexOf('\\') + 1);
    process.chdir(newPath);
    console.log(newPath);
    msg.curDirMsg(newPath);
    return;
  } catch {
    msg.opFailed();
  }
};
