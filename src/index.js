import { exit } from 'node:process';
import { getUsername } from './utils/getUsername.js';
import { logger } from './utils/logger.js';
import { MESSAGE_TYPE_INFO, MESSAGE_TYPE_ERROR } from './constants/constants.js';
import { getExitMessage, getGreetingMessage } from './utils/helper.js';


const fileManager = () => {
    let username = null;
    try {
        username = getUsername();
        logger(getGreetingMessage(username), MESSAGE_TYPE_INFO);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'An unexpected error occurred.';
        logger(message, MESSAGE_TYPE_ERROR);
        exit(1);
    }
    
    logger(getExitMessage(username), MESSAGE_TYPE_INFO);
};

fileManager ();