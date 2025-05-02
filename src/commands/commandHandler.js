import { INVALID_INPUT_MSG } from "../constants/errorConstants.js";
import { getInvalidCommandMessage } from "../utils/errorHandlers.js";
import { handleUpCommand } from "./navigation.js";

const commandHandler = async (input) => {
    const [command, ...args] = input.trim().split(' ');
    const commandMap = {
        'up': handleUpCommand,
    };

    try {
        if (!commandMap[command]) {
            throw new Error(getInvalidCommandMessage(command));
        }
        await commandMap[command](...args); 
    } catch (error) {
        throw new Error(`${INVALID_INPUT_MSG} ${error.message}`);
    }
};

export default commandHandler;