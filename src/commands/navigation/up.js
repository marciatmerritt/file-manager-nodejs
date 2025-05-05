import { dirname, parse } from 'path';
import { chdir, cwd } from 'process';
import { MESSAGE_NO_PREVIOUS_DIR } from '../../constants/messages.js';
import { INVALID_ARGS_UP_MSG } from '../../constants/errorConstants.js';
import { getInvalidInputMessage } from '../../utils/errorHandlers.js';

/**
 * Changes working directory to parent, unless already at root.
 */
export const up = async (args) => {
    if (args.length > 0) {
        throw new Error(getInvalidInputMessage(INVALID_ARGS_UP_MSG));
    };

    const currentDir = cwd();
    const rootDir = parse(currentDir).root;
    const targetDir = dirname(currentDir);
  
    if (currentDir === rootDir) {
      return {cmd: 'up', data: MESSAGE_NO_PREVIOUS_DIR};
    };

    chdir(targetDir);
    return null;
};
