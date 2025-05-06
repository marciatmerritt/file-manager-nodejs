import { arch } from 'os';
import { ERROR_CPU_ARCH_FETCH } from '../../constants/errorConstants.js';
import { getOperationFailedMessage } from '../../utils/errorHandlers.js';

export const cpuArchitecture = async () => {
    try {
      return {
        type: 'info',
        data: arch(),
      }
    } catch (error) {
      throw new Error(getOperationFailedMessage(`${ERROR_CPU_ARCH_FETCH}: ${error.message}`));
    }
};