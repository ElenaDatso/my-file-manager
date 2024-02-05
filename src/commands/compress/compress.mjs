import { createReadStream, createWriteStream } from 'fs';
import { createBrotliCompress } from 'zlib';
import { pipeline } from 'stream';
import { promisify } from 'util';

const pipelineAsync = promisify(pipeline);

export async function compressCommand (pathToFile, pathToDestination) {
  const source = createReadStream(pathToFile);
  const destination = createWriteStream(pathToDestination);
  const brotliCompress = createBrotliCompress();

  try {
    await pipelineAsync(source, brotliCompress, destination);
    console.log(
      'File successfully compressed using Brotli and written to destination.'
    );
  } catch (err) {
    console.error('An error occurred:', err);
  }
};

