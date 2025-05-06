import { cwd } from 'process';
import { INVALID_ARGS_LS_MSG } from '../../constants/errorConstants.js';
import { getInvalidInputMessage, getOperationFailedMessage } from '../../utils/errorHandlers.js';
import { readdir } from 'fs/promises';

/**
 * Lists the contents of the current directory in a sorted table.
 * Returns an array of { Name, Type } objects.
 */
export const ls = async (args) => {
    if (args.length > 0) {
        throw new Error(getInvalidInputMessage(INVALID_ARGS_LS_MSG));
    };

    const currentDir = cwd();
  
    try {
      const entries = await readdir(currentDir, { withFileTypes: true });
      const result = entries.map(entry => ({
        Name: entry.name,
        Type: entry.isDirectory() ? 'directory' : 'file',
      }));
  
      // Sort directories and files separately, both alphabetically
      result.sort((a, b) => {
        if (a.Type === 'directory' && b.Type === 'file') return -1;
        if (a.Type === 'file' && b.Type === 'directory') return 1;
        return a.Name.localeCompare(b.Name);
      });

      return {
        type: 'table',
        data: result,
        columns: ['Name', 'Type']};
    } catch (error) {
        throw new Error(getOperationFailedMessage(error.message));
    }
  };