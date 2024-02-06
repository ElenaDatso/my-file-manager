import fsPromis from 'fs/promises';
import path from 'path';
import { msg } from '../../messages/msg.mjs';

export async function renameCommand(filePath, newName) {
  try {
    const absoluteFilePath = path.resolve(filePath);
    const directory = path.dirname(absoluteFilePath);
    const newPath = path.join(directory, newName);

    await fsPromis.rename(absoluteFilePath, newPath);
    console.log(`File has been renamed to ${newName}`);
    msg.curDirMsg(process.cwd())

  } catch (error) {
    msg.opFailed();
  }
}
