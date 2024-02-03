import { closeEvent } from "./basic/close.mjs";
import { upCommand } from "./navigating/up.mjs";
import { addCommand } from "./basic/add.mjs";
import { deleteCommand } from './basic/delete.mjs';
import { cdCommand } from "./navigating/cd.mjs";
import { listCommand } from "./navigating/list.mjs";
import { catCommand } from "./basic/cat.mjs";
import { renameCommand } from "./basic/rename.mjs";
import { copyCommand } from "./basic/copy.mjs";

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
}