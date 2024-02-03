import fs from 'fs/promises';
import path from 'path';

export async function listCommand(cwd) {
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
  } catch (error) {
    console.error(`Error reading directory: ${error}`);
  }
}
