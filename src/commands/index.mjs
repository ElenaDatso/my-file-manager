import { cdCommand , listCommand, upCommand} from "./navigating/index.mjs";
import { addCommand, catCommand, closeEvent, copyCommand, renameCommand, deleteCommand } from "./basic/index.mjs";
import { eolCommand, cpusCommand, usernameCommand, archCommand } from "./os/index.mjs";
import { hashCommand } from "./hash/hash.mjs";

export const commandList = {
  close: closeEvent,
  up: upCommand,
  add: addCommand,
  delete: deleteCommand,
  cd: cdCommand,
  list: listCommand,
  cat: catCommand,
  rn: renameCommand,
  cp: copyCommand,
  eol: eolCommand,
  cpus: cpusCommand,
  homedir: homeDirCommand,
  username: usernameCommand,
  architecture: archCommand,
  hash: hashCommand,
};
