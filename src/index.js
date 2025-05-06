import { chdir, stdout } from 'node:process';
import { homedir } from 'node:os';
import { getUsername } from './utils/getUsername.js';
import { logger } from './utils/logger.js';
import { MESSAGE_TYPE_INFO, MESSAGE_TYPE_PROMPT } from './constants/messageTypes.js';
import { MESSAGE_EMPTY_INPUT } from './constants/messages.js';
import { SIGNAL_CTRL_C } from './constants/constants.js';
import { getGreetingMessage, handleExit, readlineInterface, printWorkingDirectory } from './utils/helper.js';
import { handleError, handleFatalError } from './utils/errorHandlers.js';
import commandHandler from './commands/commandHandler.js';
import { displayResults } from './utils/displayResults.js';


const fileManager = () => {
    let username = null;
    try {
        username = getUsername();
        chdir(homedir());
        logger(getGreetingMessage(username), MESSAGE_TYPE_INFO);
        printWorkingDirectory();
    } catch (error) {
        handleFatalError(error, 1);
    };

    readlineInterface.prompt();
    
    readlineInterface.on('line', async (input) => {
        try {
            const command = input.trim();
        
            if (!command) {
                logger(MESSAGE_EMPTY_INPUT, MESSAGE_TYPE_PROMPT);
                readlineInterface.prompt();
                return;
            }
            if (command === '.exit') {
                handleExit(username);
            };

            const result = await commandHandler(command);
            displayResults(result);
            printWorkingDirectory();
            
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