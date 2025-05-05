import { getInvalidInputMessage } from '../../utils/errorHandlers.js';
import { INVALID_ARGS_OS_FORMAT_MSG, INVALID_ARGS_OS_MSG } from '../../constants/errorConstants.js';
import { eol } from './eol.js';
import { getHomeDir } from './homedir.js';
import { cpuArchitecture } from './architecture.js';
import { systemUsername } from './username.js';
import { getCPUInfo } from './cpus.js';

/**
 * Handles OS-related commands.
 * @param {string[]} args - OS command arguments (e.g., ['--cpus'])
 */
export const os = async (args) => {
    if (args.length !== 1) {
        throw new Error(getInvalidInputMessage(INVALID_ARGS_OS_MSG));
    }
    if (!args[0].startsWith('--')) {
        throw new Error(getInvalidInputMessage(INVALID_ARGS_OS_FORMAT_MSG));
    }

    const command = args[0];
    switch (command) {
        case '--homedir':
            return getHomeDir();
        case '--EOL':
            return eol();
        case '--cpus':
            return getCPUInfo();
        case '--username':
            return systemUsername();
        case '--architecture':
            return cpuArchitecture();
        default:
            throw new Error(getInvalidInputMessage(`Invalid OS command: ${command}`));
    }
};