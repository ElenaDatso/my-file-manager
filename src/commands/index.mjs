import { navFunc } from "./navigating/index.mjs";
import { basicFuncs} from "./basic/index.mjs";
import { osFuncs } from "./os/index.mjs";
import { hashCommand } from "./hash/hash.mjs";
import { compressFuncs } from "./compress/index.mjs";

export const commandList = {
  close: basicFuncs.closeEvent,
  up: navFunc.upCommand,
  add: basicFuncs.addCommand,
  delete: basicFuncs.deleteCommand,
  cd: navFunc.cdCommand,
  list: navFunc.listCommand,
  cat: basicFuncs.catCommand,
  rn: basicFuncs.renameCommand,
  cp: basicFuncs.copyCommand,
  eol: osFuncs.eolCommand,
  cpus: osFuncs.cpusCommand,
  homedir: osFuncs.homeDirCommand,
  username: osFuncs.usernameCommand,
  architecture: osFuncs.archCommand,
  hash: hashCommand,
  compress: compressFuncs.compressCommand,
  decompress: compressFuncs.decompressCommand
};
