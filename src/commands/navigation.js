import { dirname, parse } from 'path';
import { logger } from '../utils/logger.js';
import { chdir, cwd } from 'process';
import { MESSAGE_NO_PREVIOUS_DIR } from '../constants/messages.js';
import { MESSAGE_TYPE_INFO } from '../constants/constants.js';
import { printWorkingDirectory } from '../utils/helper.js';

/**
 * Changes working directory to parent, unless already at root.
 */
export const handleUpCommand = async () => {
    const currentDir = cwd();
    const rootDir = parse(currentDir).root;
    const targetDir = dirname(currentDir);
  
    if (currentDir === rootDir) {
      logger(MESSAGE_NO_PREVIOUS_DIR, MESSAGE_TYPE_INFO);
      return;
    };

    chdir(targetDir);
    printWorkingDirectory();
  };