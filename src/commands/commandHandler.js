import { getInvalidCommandMessage } from "../utils/errorHandlers.js";
import { cd, up, ls } from './navigation/index.js'; 

const commandHandler = async (input) => {
    const [command, ...args] = input.trim().split(' ');
    const commandMap = {
        up,
        cd,
        ls,
    };

    if (!commandMap[command]) {
        throw new Error(getInvalidCommandMessage(command));
    };

    return await commandMap[command](args);
};

export default commandHandler;