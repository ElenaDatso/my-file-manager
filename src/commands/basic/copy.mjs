import fs from 'fs';
import path from 'path';
import { msg } from '../../messages/msg.mjs';

function copyFileAsync(sourcePath, destinationPath) {
  return new Promise((resolve, reject) => {
    const resolvedSourcePath = path.resolve(sourcePath);
    const resolvedDestinationPath = path.resolve(destinationPath);

    fs.stat(resolvedDestinationPath, (err, stats) => {
      if (err) {
        reject(err);
        return;
      }

      let finalDestinationPath = resolvedDestinationPath;
      if (stats.isDirectory()) {
        finalDestinationPath = path.join(
          resolvedDestinationPath,
          path.basename(resolvedSourcePath)
        );
      }

      const readStream = fs.createReadStream(resolvedSourcePath);
      const writeStream = fs.createWriteStream(finalDestinationPath);

      readStream.on('error', reject);
      writeStream.on('error', reject);
      writeStream.on('finish', resolve);

      readStream.pipe(writeStream);
    });
  });
}

export async function copyCommand(sourcePath, destinationPath) {
  try {
    await copyFileAsync(sourcePath, destinationPath);
    console.log('File has been copied successfully.');
    msg.curDirMsg(process.cwd());
  } catch (error) {
    console.error(error);
    msg.opFailed();
  }
}
