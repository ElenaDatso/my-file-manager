import os from 'os';

export const homeDirCommand = () => {
  const homeDirectory = os.homedir();
  console.log(`Home Directory: ${homeDirectory}`);
}