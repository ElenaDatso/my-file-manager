import { createReadStream, createWriteStream, existsSync, statSync } from 'fs';
import { createBrotliCompress } from 'zlib';
import { pipeline } from 'stream';
import { promisify } from 'util';
import path from 'path';
import { msg } from '../../messages/msg.mjs';

const pipelineAsync = promisify(pipeline);

export async function compressCommand(pathToFile, pathToDestination) {
  const absolutePathToFile = path.resolve(pathToFile);
  let absolutePathToDestination = path.resolve(pathToDestination);

  if (
    existsSync(absolutePathToDestination) &&
    statSync(absolutePathToDestination).isDirectory()
  ) {
    const fileNameWithExtension = path.basename(pathToFile) + '.br';
    absolutePathToDestination = path.join(
      absolutePathToDestination,
      fileNameWithExtension
    );
  } else {
    const destinationDir = path.dirname(absolutePathToDestination);
    if (!existsSync(destinationDir)) {
      throw new Error(
        `Destination directory does not exist: ${destinationDir}`
      );
    }
    if (path.basename(absolutePathToDestination) === destinationDir) {
      const fileNameWithExtension = path.basename(pathToFile) + '.br';
      absolutePathToDestination = path.join(
        destinationDir,
        fileNameWithExtension
      );
    }
  }

  const source = createReadStream(absolutePathToFile);
  const destination = createWriteStream(absolutePathToDestination);
  const brotliCompress = createBrotliCompress();

  try {
    await pipelineAsync(source, brotliCompress, destination);
    console.log(
      'File successfully compressed using Brotli and written to destination:',
      absolutePathToDestination
    );
    msg.curDirMsg(process.cwd());
  } catch (error) {
    console.error('An error occurred:', error);
    msg.opFailed();
  }
}
