import { homedir } from "node:os";
import { getOperationFailedMessage } from "../../utils/errorHandlers.js";
import { ERROR_HOME_DIR_FETCH } from "../../constants/errorConstants.js";
/**
 * Get the home directory of the current user. (os --homedir)
 */
export const getHomeDir = async () => {
    try {
        return {
            type: 'info',
            data: homedir(),
        };
    } catch (error) {
      throw new Error(getOperationFailedMessage(`${ERROR_HOME_DIR_FETCH}: ${error.message}`));
    }
};
  