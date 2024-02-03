import fs from 'fs';
import path from 'path';

function copyFileAsync(sourcePath, destinationPath) {
  return new Promise((resolve, reject) => {
    const resolvedSourcePath = path.resolve(sourcePath).normalize();
    const resolvedDestinationPath = path.resolve(destinationPath).normalize();
    const readStream = fs.createReadStream(resolvedSourcePath);
    const writeStream = fs.createWriteStream(resolvedDestinationPath);

    readStream.on('error', reject);
    writeStream.on('error', reject);
    writeStream.on('finish', resolve);

    readStream.pipe(writeStream);
  });
}

export async function copyCommand(sourcePath, destinationPath) {
  try {
    await copyFileAsync(sourcePath, destinationPath);
    console.log('File has been copied successfully.');
  } catch (error) {
    console.error(`Error copying file: ${error.message}`);
  }
}


