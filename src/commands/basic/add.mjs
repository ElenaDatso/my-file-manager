import fs from 'fs';
import path from 'path';


export const addCommand = (fileName) => {
  const currentWD = process.cwd();
  const filePath = path.join(currentWD, fileName);
  fs.writeFile(filePath, '', (err) => {
  if (err) {
    console.error('Error creating the file:', err);
  } else {
    console.log(`Success! The file is created /n You are currently in ${currentWD}`);
  }
});
}
