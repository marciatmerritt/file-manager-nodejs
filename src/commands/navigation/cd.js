import { isAbsolute, resolve } from 'path';
import { chdir, cwd } from 'process';
import { MESSAGE_SAME_DIR } from '../../constants/messages.js';
import { INVALID_ARGS_CD_MSG, INVALID_DIR_MSG, OPERATION_FAILED_MSG } from '../../constants/errorConstants.js';
import { getInvalidInputMessage, getOperationFailedMessage } from '../../utils/errorHandlers.js';
import { stat } from 'fs/promises';

/**
 * Changes working directory to the specified dir.
 * 
 * @param {string[]} args - Array containing the target directory path.
 */
export const cd = async (args) => {
    if (args.length !== 1) {
        throw new Error(getInvalidInputMessage(INVALID_ARGS_CD_MSG));
    }

    const target = isAbsolute(args[0]) ? args[0] : resolve(cwd(), args[0]);
    const currentDir = cwd();

    if (target === currentDir) {
        return {
            type: 'prompt',
            data: MESSAGE_SAME_DIR
        };
    }

    try {
        const targetDir = await stat(target);
        
        if (!targetDir.isDirectory()) {
            throw new Error(getOperationFailedMessage(INVALID_DIR_MSG));
        }
        chdir(target);
        return null;
    } catch (error) {
        if (['ENOENT', 'ENOTDIR'].includes(error.code)) {
            throw new Error(getOperationFailedMessage(INVALID_DIR_MSG));
        }    
        throw new Error(`${OPERATION_FAILED_MSG}: ${error.message}`);
    }
};
