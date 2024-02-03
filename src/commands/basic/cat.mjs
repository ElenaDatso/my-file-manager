import fs from 'fs';
import path from 'path';

export function catCommand(filePath) {
  const fullPath = path.resolve(filePath);
  const readStream = fs.createReadStream(fullPath, { encoding: 'utf8' });

  readStream.on('data', (chunk) => {
    console.log(chunk);
  });

  readStream.on('error', (error) => {
    console.error(`Error reading file: ${error.message}`);
  });

  readStream.on('end', () => {
    console.log('File has been read completely.');
  });
}

