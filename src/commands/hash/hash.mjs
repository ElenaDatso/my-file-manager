import fs from 'fs';
import crypto from 'crypto';
import path from 'path';

export const hashCommand = (filePath, algorithm = 'sha256') => {
  const fileStream = fs.createReadStream(path.resolve(filePath));
  const hash = crypto.createHash(algorithm);

  fileStream.on('data', (data) => {
    hash.update(data);
  });

  fileStream.on('end', () => {
    const fileHash = hash.digest('hex');
    console.log(`Hash for file "${filePath}" using ${algorithm}: ${fileHash}`);
  });

  fileStream.on('error', (error) => {
    console.error(`Error reading file: ${error.message}`);
  });
}
