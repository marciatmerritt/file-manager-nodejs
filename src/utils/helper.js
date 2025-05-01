import { createInterface } from 'readline';
import { exit, stdin as input, stdout as output } from 'process';
import { MESSAGE_GREETING, MESSAGE_EXIT, MESSAGE_CURRENT_DIR, MESSAGE_TYPE_INFO, MESSAGE_TYPE_ERROR, UNEXPECTED_ERROR_MSG } from "../constants/constants.js";
import { logger } from './logger.js';

export const getGreetingMessage = (username) => `${MESSAGE_GREETING}${username}!`;
export const getExitMessage = (username) => `${MESSAGE_EXIT}${username}, goodbye!`;
export const getCurrentDirMessage = (currentDirectory) => `${MESSAGE_CURRENT_DIR}${currentDirectory}`;

export const readlineInterface = createInterface({
    input,
    output,
    prompt: '> ',
});

/**
 * Handles file manager exit procedure
 *
 * Logs a farewell message to the user based on their username.
 * Closes the `readline` interface, which will automatically trigger the application to exit.
 *
 * @param {string} username
 */
export const handleExit = (username) => {
    logger(getExitMessage(username), MESSAGE_TYPE_INFO);
    readlineInterface.close();
    exit(0);
};

/**
 * Handles fatal errors during application execution
 *
 * Logs the error message, closes the readline interface, 
 * and exits the process with status code 1.
 *
 * @param {Object} error - The error object or message to handle.
 *   If it's an instance of `Error`, its message is used.
 *   Or a default fallback error message is logged.
 *
 * @returns {void}
 */ 
export const handleError = (error) => {
    const message = error instanceof Error ? error.message : UNEXPECTED_ERROR_MSG;
    logger(message, MESSAGE_TYPE_ERROR);
    readlineInterface.close();
    exit(1);
};
