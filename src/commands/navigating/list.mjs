import fs from 'fs/promises';
import path from 'path';
import { msg } from '../../messages/msg.mjs';

export async function listCommand() {
  const cwd = process.cwd();
  try {
    const files = await fs.readdir(cwd);
    const filesDetails = await Promise.all(
      files.map(async (file) => {
        const filePath = path.join(cwd, file);
        const stats = await fs.stat(filePath);
        return {
          name: file,
          type: stats.isDirectory() ? 'Directory' : 'File',
          size: stats.size,
        };
      })
    );

    console.table(filesDetails);
  } catch {
    msg.opFailed();
  }
}
