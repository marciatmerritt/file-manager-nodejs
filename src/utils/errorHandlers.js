import { exit } from 'process';
import { MESSAGE_TYPE_ERROR } from '../constants/constants.js';
import { MESSAGE_CHECK_COMMAND } from '../constants/messages.js';
import { logger } from './logger.js';
import { readlineInterface } from './helper.js';
import { ERROR_UNKNOWN_COMMAND, UNEXPECTED_ERROR_MSG } from '../constants/errorConstants.js';

export const getInvalidCommandMessage = (command) => `${ERROR_UNKNOWN_COMMAND}: ${command}. ${MESSAGE_CHECK_COMMAND}`;

export const logErrorMessage = (error) => {
    const message = error instanceof Error ? error.message : UNEXPECTED_ERROR_MSG;
    logger(message, MESSAGE_TYPE_ERROR);
};

/**
 * Logs non-fatal errors and continues application execution
 *
 * @param {Error} error - The error object or message to handle.
 */ 
export const handleError = (error) => {
    logErrorMessage(error);
};

/**
 * Logs fatal errors and terminates the application
 *
 * @param {Error} error - The error object or message to handle.
 * @param {number} [code=1] - Optional exit code.
 */ 
export const handleFatalError = (error, code = 1) => {
    logErrorMessage(error);
    readlineInterface.close();
    exit(code);
};