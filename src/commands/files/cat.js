import { createReadStream } from 'fs';
import { cwd, stdout } from 'process';
import { join } from 'path';
import { ERROR_CODE_NO_ENTITY } from "../../constants/errorConstants.js";
import { getInvalidInputMessage, getOperationFailedMessage } from "../../utils/errorHandlers.js";
import { FILE_NOT_FOUND_MSG } from "../../constants/errorConstants.js";
import { assertFileExists } from "../../utils/fsExists.js";
import { validateSingleArgument } from "../../utils/validateArguments.js"

/**
 * Reads a file using a readable stream and writes its contents to stdout.
 *
 * @param {string[]} args - CLI arguments (should be one file name).
 * @returns {Promise<{ type: 'success', message: string }>} - Success message after file content is displayed.
 *
 * @throws {Error} If the file is missing or unreadable.
 */
export const cat = async (args) => {
    validateSingleArgument('cat', args);

    const filePath = join(cwd(), args[0]);
    try {
        await assertFileExists(filePath, true);

        const stream = createReadStream(filePath, { encoding: 'utf8' });
        return new Promise((resolve, reject) => {
            stream.pipe(stdout);
            stream.on('end', () => {
                stdout.write('\n');
                resolve({
                    type: 'info',
                    data: `File contents displayed from ${filePath}` }
                );
            });
            stream.on('error', (error) => {
                reject(new Error(getOperationFailedMessage(`Error reading file: ${error.message}`)));
            });
        });
    } catch (error) {
        if (error.code === ERROR_CODE_NO_ENTITY) {
            throw new Error(getInvalidInputMessage(`${FILE_NOT_FOUND_MSG} at ${filePath}`));
        }
        throw new Error(getInvalidInputMessage(`${FILE_NOT_FOUND_MSG} at ${filePath}`));
    }
}