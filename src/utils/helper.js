import { createInterface } from 'readline';
import { cwd, exit, stdin as input, stdout as output } from 'process';
import { MESSAGE_GREETING, MESSAGE_EXIT, MESSAGE_CURRENT_DIR } from '../constants/messages.js';
import { MESSAGE_TYPE_INFO } from '../constants/messageTypes.js';
import { logger } from './logger.js';

export const getGreetingMessage = (username) => `${MESSAGE_GREETING}${username}!`;
export const getExitMessage = (username) => `${MESSAGE_EXIT}${username}, goodbye!`;
export const getCurrentDirMessage = (currentDirectory) => `${MESSAGE_CURRENT_DIR}${currentDirectory}`;

/**
 * Logs the current working directory using the styled logger.
 */
export const printWorkingDirectory = () => {
    logger(getCurrentDirMessage(cwd()), MESSAGE_TYPE_INFO);
};

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
 * Converts a speed in MHz to GHz by dividing the value by 1000.
 *
 * @param {number} speedMHz - The speed in MHz to convert to GHz.
 * @returns {number} The equivalent speed in GHz.
 */
export const convertMHzToGHz = (speedMHz) => {
    return speedMHz / 1000;
};