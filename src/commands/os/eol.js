import { EOL } from 'node:os';
import { getOperationFailedMessage } from '../../utils/errorHandlers.js';
import { ERROR_EOL_FETCH, ERROR_EOL_NOT_DEFINED } from '../../constants/errorConstants.js';


export const eol = async () => {
    try {
        // Check if EOL is defined and is a string
        if (typeof EOL !== 'string') {
            throw new Error(getOperationFailedMessage(ERROR_EOL_NOT_DEFINED));
        }
        return {
            type: 'info',
            data: JSON.stringify(EOL),
        };
    } catch (error) {
        throw new Error(getOperationFailedMessage(`${ERROR_EOL_FETCH}: ${error.message}`));
    };
};