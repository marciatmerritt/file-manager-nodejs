import { access } from 'fs/promises';
import { constants } from 'fs';
import { getOperationFailedMessage } from './errorHandlers.js';
import { ERROR_CODE_NO_ENTITY } from '../constants/errorConstants.js';

/**
 * Checks whether a file exists at the given path.
 *
 * @param {string} path - The path to the file.
 * @returns {Promise<boolean>} - True if file exists, false if not.
 * @throws {Error} - Throws if another error (e.g., permission issue) occurs.
 */
export const fileExists = async (path) => {
    try {
        await access(path, constants.F_OK);
        return true;
    } catch (error) {
        if (error.code === ERROR_CODE_NO_ENTITY) {
            return false;
        }
        throw new Error(getOperationFailedMessage(error.message));
    }
};

/**
 * Checks whether a path exists and is a directory.
 * @param {string} path - The path to check.
 * @returns {Promise<boolean>} - True if path is a directory, false otherwise.
 */
export const directoryExists = async (path) => {
    try {
        const stats = await access(path, constants.F_OK);
        return stats.isDirectory();
    } catch (error) {
        if (error.code === ERROR_CODE_NO_ENTITY) {
            return false;
        }
        throw new Error(getOperationFailedMessage(error.message));
    }
};

/**
 * Utility to assert that a file exists or does not exist based on the expectation.
 * @param {string} filePath - Path to the file.
 * @param {boolean} [shouldExist=true] - Whether the file is expected to exist.
 * @throws Will throw if file existence does not match the expectation.
 */
export const assertFileExists = async (filePath, shouldExist = true) => {
    const exists = await fileExists(filePath);
    if (shouldExist && !exists) {
        throw new Error(`Expected file to exist at ${filePath}, but it does not.`);
    }
    if (!shouldExist && exists) {
        throw new Error(`Expected file to not exist at ${filePath}, but it does.`);
    }
    return exists;
}

