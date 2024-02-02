import fs from 'fs';

export const deleteCommand = (pathToFile, curWD) => {
  fs.rm(pathToFile, () => {
    console.log(
      `The file was succsfully removed. /n You are currently in ${curWD}}`
    );
  });
};
