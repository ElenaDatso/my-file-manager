export const upCommand = () => {
  const curWD = process.cwd();
    const newPath = curWD.slice(0, curWD.lastIndexOf('\\'));
    process.chdir(newPath);
    console.log(`You are currently in${newPath}`);
  return;
};
