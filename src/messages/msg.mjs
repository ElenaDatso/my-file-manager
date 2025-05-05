// export const curDirMsg = (path) => console.log(`\nYou are currently in ${path}\n`);
export const msg = {
  curDirMsg: function (path) {
    console.log(`\nYou are currently in ${path}\n`);
  },
  invInp: function () {
    console.log(`Invalid input`);
  },
  opFailed: function () {
    console.log(`Operation failed`);
  }
}
