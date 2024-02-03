import path from 'path';

export const cdCommand = (pathToGo, cwd) => {
  const normalPath = path.normalize(pathToGo);

  if (path.extname(normalPath)) {
    console.log('It is not a directory path');
    return;
  }

  try {
    if (path.isAbsolute(normalPath)) {
      process.chdir(normalPath);
    } else {
      const relativePath = path.relative(cwd, normalPath);
      process.chdir(relativePath);
    }
  } catch (error) {
    console.error(`Failed to change directory: ${error}`);
  }
};
