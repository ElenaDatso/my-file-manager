import { closeEvent } from "./basic/close.mjs";
import { upCommand } from "./basic/up.mjs";
import { addCommand } from "./basic/add.mjs";
import { deleteCommand } from './basic/delete.mjs';

export const commandList = {
  close: closeEvent,
  up: upCommand,
  add: addCommand,
  delete: deleteCommand,
}