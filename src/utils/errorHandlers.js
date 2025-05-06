import { exit } from 'process';
import { MESSAGE_TYPE_ERROR } from '../constants/messageTypes.js';
import { MESSAGE_CHECK_COMMAND } from '../constants/messages.js';
import { logger } from './logger.js';
import { printWorkingDirectory, readlineInterface } from './helper.js';
import { ERROR_UNKNOWN_COMMAND, INVALID_INPUT_MSG, OPERATION_FAILED_MSG, UNEXPECTED_ERROR_MSG } from '../constants/errorConstants.js';

export const getInvalidCommandMessage = (command) => `${INVALID_INPUT_MSG} ${ERROR_UNKNOWN_COMMAND}: ${command}. ${MESSAGE_CHECK_COMMAND}`;
export const getInvalidInputMessage = (input) => `${INVALID_INPUT_MSG} ${input} ${MESSAGE_CHECK_COMMAND}`;
export const getOperationFailedMessage = (error) => `${OPERATION_FAILED_MSG} ${error}`;
export const getInvalidArgumentsErrorMessage = (command, reason) => `${INVALID_INPUT_MSG}, "${command}" ${reason}. ${MESSAGE_CHECK_COMMAND}`;

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
    printWorkingDirectory();
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