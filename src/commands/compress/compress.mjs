import { createReadStream, createWriteStream, existsSync, statSync } from 'fs';
import { createBrotliCompress } from 'zlib';
import { pipeline } from 'stream';
import { promisify } from 'util';
import path from 'path';
import { msg } from '../../messages/msg.mjs';

const pipelineAsync = promisify(pipeline);

export async function compressCommand(pathToFile, pathToDestination) {
  // Определяем абсолютные пути
  const absolutePathToFile = path.resolve(pathToFile);
  let absolutePathToDestination = path.resolve(pathToDestination);

  if (
    existsSync(absolutePathToDestination) &&
    statSync(absolutePathToDestination).isDirectory()
  ) {
    const fileName =
      path.basename(pathToFile, path.extname(pathToFile)) + '.br';
    absolutePathToDestination = path.join(absolutePathToDestination, fileName);
  } else {

    const destinationDir = path.dirname(absolutePathToDestination);
    if (!existsSync(destinationDir)) {
      throw new Error(
        `Destination directory does not exist: ${destinationDir}`
      );
    }
    if (
      path.basename(absolutePathToDestination) ===
      path.dirname(absolutePathToDestination)
    ) {
      const fileName =
        path.basename(pathToFile, path.extname(pathToFile)) + '.br';
      absolutePathToDestination = path.join(destinationDir, fileName);
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
  } catch {
    msg.opFailed();
  }
}
