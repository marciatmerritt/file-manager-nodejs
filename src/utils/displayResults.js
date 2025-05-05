import { logger } from './logger.js';
import { MESSAGE_TYPE_INFO, MESSAGE_TYPE_PROMPT } from '../constants/messageTypes.js';
import { printWorkingDirectory } from './helper.js';

export const displayResults = (result) => {
    if (!result) {
        printWorkingDirectory();
        return;
    }

    const { type, data, columns, message } = result;

    if (type === 'table' && Array.isArray(data)) {
        console.table(data, columns);
        if (message) {
            logger(message, MESSAGE_TYPE_INFO);
        }
        printWorkingDirectory();
        return;
    } 
    
    if (type === 'prompt') {
        logger(data, MESSAGE_TYPE_PROMPT);
    } else if (type === 'info') {
        logger(data, MESSAGE_TYPE_INFO);
    }

    printWorkingDirectory();
};