import { userInfo } from "os";
import { ERROR_SYS_USERNAME_FETCH } from "../../constants/errorConstants.js";
import { getOperationFailedMessage } from "../../utils/errorHandlers.js";

export const systemUsername = async () => {
    try {
      return {
        type: 'info',
        data: userInfo().username,
      };
    } catch (error) {
      throw new Error(getOperationFailedMessage(`${ERROR_SYS_USERNAME_FETCH}: ${error.message}`));
    }
};
