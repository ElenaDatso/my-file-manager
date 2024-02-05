import { createReadStream, createWriteStream } from 'fs';
import { createBrotliDecompress } from 'zlib';
import { pipeline } from 'stream';
import { promisify } from 'util';

const pipelineAsync = promisify(pipeline);

export async function decompressCommand(pathToCompressedFile, pathToDestination) {
  const source = createReadStream(pathToCompressedFile);
  const destination = createWriteStream(pathToDestination);
  const brotliDecompress = createBrotliDecompress();

  try {
    await pipelineAsync(source, brotliDecompress, destination);
    console.log(
      'File successfully decompressed using Brotli and written to destination.'
    );
  } catch (err) {
    console.error('An error occurred:', err);
  }
}
