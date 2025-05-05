import fs from 'fs';
import path from 'path';
import { msg } from '../../messages/msg.mjs';

export function catCommand(filePath) {
  const fullPath = path.resolve(filePath);
  const readStream = fs.createReadStream(fullPath, { encoding: 'utf8' });

  readStream.on('data', (chunk) => {
    console.log(chunk);
  });

  readStream.on('error', (error) => {
    msg.opFailed();
  });
}

