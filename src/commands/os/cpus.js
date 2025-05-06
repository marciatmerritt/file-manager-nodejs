import { cpus } from 'os';
import { getOperationFailedMessage } from '../../utils/errorHandlers.js';
import { ERROR_CPU_FETCH } from '../../constants/errorConstants.js';
import { convertMHzToGHz } from '../../utils/helper.js';

export const getCPUInfo = async () => {
  
    try {
        const cpusArray = cpus();
        const numCPUs = cpusArray.length;
        const cpuDetails = cpusArray.map((cpu, index) => ({
            ID: index + 1,
            Model: cpu.model,
            SpeedGHz: convertMHzToGHz(cpu.speed),
        }));
        
        return {
            type: 'table',
            data: cpuDetails,
            columns: ['ID', 'Model', 'SpeedGHz'],
            message: `Number of CPUs: ${numCPUs}`,
            }
    } catch (error) {
      throw new Error(getOperationFailedMessage(`${ERROR_CPU_FETCH}: ${error.message}`));
    }
  };