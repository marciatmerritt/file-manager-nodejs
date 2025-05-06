import { writeFile } from "fs/promises";
import { join } from "path";
import { cwd } from "process";
import { ERROR_CODE_FILE_EXISTS, FILE_AlREADY_EXISTS_MSG } from "../../constants/errorConstants.js";
import { getOperationFailedMessage } from "../../utils/errorHandlers.js";
import { assertFileExists } from "../../utils/fsExists.js";
import { validateSingleArgument } from "../../utils/validateArguments.js";

/**
 * Creates a new file at the specified path if it does not already exist.
 *
 * This function expects exactly one argument — the file name (relative to the current working directory).
 * If the file already exists, or if invalid arguments are provided, it throws a descriptive error.
 *
 * @param {string[]} args - Command-line arguments containing the file name.
 * @returns {Promise<{ type: 'success', message: string }>} - A result object to be used with displayResults().
 *
 * @throws {Error} If no file name is provided, too many arguments are given,
 *                 the file already exists, or another file creation error occurs.
 */
export const add = async (args) => {
    validateSingleArgument('add', args);

    const filePath = join(cwd(), args[0]);

    try {
        await assertFileExists(filePath, false);
        await writeFile(filePath, '', { flag: 'wx' });
    } catch (error) {
        if (error.code === ERROR_CODE_FILE_EXISTS) {
            throw new Error(getOperationFailedMessage(`${FILE_AlREADY_EXISTS_MSG} at ${filePath}`));
        } else {
            throw new Error(getOperationFailedMessage(`Error creating file: ${error.message}`));
        }
    }
    return {
        type: 'success',
        message: `File created at ${filePath}`
    };
}