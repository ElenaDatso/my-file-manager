import { createReadStream, createWriteStream, existsSync, statSync } from 'fs';
import { createBrotliDecompress } from 'zlib';
import { pipeline } from 'stream';
import { promisify } from 'util';
import path from 'path';
import { msg } from '../../messages/msg.mjs';

const pipelineAsync = promisify(pipeline);

export async function decompressCommand(
  pathToCompressedFile,
  pathToDestination
) {
  const absolutePathToCompressedFile = path.resolve(pathToCompressedFile);
  let absolutePathToDestination = path.resolve(pathToDestination);

  // Проверяем, является ли путь назначения директорией
  if (
    existsSync(absolutePathToDestination) &&
    statSync(absolutePathToDestination).isDirectory()
  ) {
    const decompressedFileName = path.basename(
      absolutePathToCompressedFile,
      '.br'
    );
    absolutePathToDestination = path.join(
      absolutePathToDestination,
      decompressedFileName
    );
  } else {
    const destinationDir = path.dirname(absolutePathToDestination);
    if (!existsSync(destinationDir)) {
      throw new Error(
        `Destination directory does not exist: ${destinationDir}`
      );
    }
    if (path.basename(absolutePathToDestination) === destinationDir) {
      const decompressedFileName = path.basename(
        absolutePathToCompressedFile,
        '.br'
      );
      absolutePathToDestination = path.join(
        destinationDir,
        decompressedFileName
      );
    }
  }

  const source = createReadStream(absolutePathToCompressedFile);
  const destination = createWriteStream(absolutePathToDestination);
  const brotliDecompress = createBrotliDecompress();

  try {
    await pipelineAsync(source, brotliDecompress, destination);
    console.log(
      'File successfully decompressed using Brotli and written to destination:',
      absolutePathToDestination
    );
    msg.curDirMsg(process.cwd());
  } catch (err) {
    msg.opFailed();
  }
}
