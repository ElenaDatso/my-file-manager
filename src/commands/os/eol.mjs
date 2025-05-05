import os from 'os';

export const eolCommand =() => {
  const eol =
    os.EOL === '\n'
      ? '\\n'
      : '\\r\\n';
  console.log(`Default system End-Of-Line: ${eol}`);
}
