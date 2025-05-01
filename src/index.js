import { chdir, stdout } from 'node:process';
import { homedir } from 'node:os';
import { getUsername } from './utils/getUsername.js';
import { logger } from './utils/logger.js';
import { MESSAGE_TYPE_INFO, SIGNAL_CTRL_C } from './constants/constants.js';
import { getGreetingMessage, handleError, handleExit, readlineInterface, printWorkingDirectory } from './utils/helper.js';


const fileManager = () => {
    let username = null;
    try {
        username = getUsername();
        chdir(homedir());
        logger(getGreetingMessage(username), MESSAGE_TYPE_INFO);
        printWorkingDirectory();
    } catch (error) {
        handleError(error);
    };

    readlineInterface.prompt();
    
    readlineInterface.on('line', (input) => {
        try {
            const command = input.trim();
        
            if (command === '.exit') {
                handleExit(username);
            };
        } catch (error) {
            handleError(error);
        };
        
        readlineInterface.prompt();
    });

    readlineInterface.on(SIGNAL_CTRL_C, () => {
        stdout.write('\n');
        handleExit(username);
    });
};

fileManager ();