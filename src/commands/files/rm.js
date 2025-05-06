import { unlink } from "fs/promises";
import { join } from "path";
import { cwd } from "process";
import { assertFileExists } from "../../utils/fsExists.js";
import { validateSingleArgument } from "../../utils/validateArguments.js";
import { ERROR_CODE_NO_ENTITY } from "../../constants/errorConstants.js";
import { getInvalidInputMessage, getOperationFailedMessage } from "../../utils/errorHandlers.js";

/**
 * Deletes a file at the specified path if it exists.
 *
 * @param {string[]} args - Command-line arguments containing the file name.
 * @returns {Promise<{ type: 'success', message: string }>} - Success message for display.
 *
 * @throws {Error} If the file does not exist or deletion fails.
 */
export const rm = async (args) => {
    validateSingleArgument('rm', args);

    const filePath = join(cwd(), args[0]);

    try {
        await assertFileExists(filePath, true);
        await unlink(filePath);
    } catch (error) {
        if (error.code === ERROR_CODE_NO_ENTITY) {
            throw new Error(getInvalidInputMessage(`File not found at ${filePath}`));
        }
        throw new Error(getOperationFailedMessage(`Error deleting file: ${error.message}`));
    }
    return {
        type: 'success',
        message: `File deleted at ${filePath}`
    };
}