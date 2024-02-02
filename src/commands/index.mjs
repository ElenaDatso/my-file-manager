import { closeEvent } from "./close.mjs";
import { upCommand } from "./up.mjs";
import { addCommand } from "./add.mjs";

export const commandList = {
  close: closeEvent,
  up: upCommand,
  add: addCommand
}