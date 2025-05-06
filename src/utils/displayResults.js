import { logger } from './logger.js';
import { MESSAGE_TYPE_INFO, MESSAGE_TYPE_PROMPT, MESSAGE_TYPE_SUCCESS } from '../constants/messageTypes.js';

/**
 * Displays structured output based on the result object type.
 *
 * Supported `type` values:
 * - `'table'`: Prints a table using console.table. Optionally logs a message afterward.
 * - `'prompt'`: Logs prompt-style text (e.g., user instructions).
 * - `'info'`: Logs informational messages.
 * - `'success'`: Logs a success message.
 *
 * The function performs no action if `result` is null, not an object,
 * or missing a valid `type` property.
 *
 * @param {Object} result - The result object to display.
 * @param {'table'|'prompt'|'info'|'success'} result.type - The type of result to display.
 * @param {Array<Object>} [result.data] - Data to be displayed, especially for 'table' type.
 * @param {string[]} [result.columns] - Optional list of columns to show in table output.
 * @param {string} [result.message] - Optional message to log for certain types.
 */
export const displayResults = (result) => {
    if (!result || typeof result !== 'object' || result.type === null) {
        return;
    }

    const { type, data, columns, message } = result;

    switch (type) {
        case 'table':
            if (Array.isArray(data)) {
                console.table(data, columns);
                if (message) {
                    logger(message, MESSAGE_TYPE_INFO);
                }
            }
            break;
        case 'prompt':
            logger(data, MESSAGE_TYPE_PROMPT);
            break;
        case 'info':
            logger(data, MESSAGE_TYPE_INFO);
            break;
        case 'success':
            logger(message, MESSAGE_TYPE_SUCCESS);
            break;
    }
};