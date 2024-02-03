import fsPromis from 'fs/promises';
import path from 'path';

export async function renameCommand(filePath, newName) {
  try {
    const absoluteFilePath = path.resolve(filePath);
    const directory = path.dirname(absoluteFilePath);
    const newPath = path.join(directory, newName);

    await fsPromis.rename(absoluteFilePath, newPath);
    console.log(`File has been renamed to ${newName}`);
  } catch (error) {
    console.error(`Error renaming file: ${error.message}`);
  }
}
