import os from 'os';

export const usernameCommand = () => {
  const username = os.userInfo().username;
  console.log(`Current system user name: ${username}`);
}

