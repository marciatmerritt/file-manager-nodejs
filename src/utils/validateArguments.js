import { getInvalidArgumentsErrorMessage } from "./errorHandlers.js";

/**
 * Validates that the args array has exactly one argument.
 *
 * @param {string[]} args - The command-line arguments.
 * @param {string} commandName - The name of the CLI command (e.g., "add").
 * @throws {Error} If no arguments or more than one argument is provided.
 */
export const validateSingleArgument = (command, args) => {
    if (args.length === 0) {
        throw new Error(getInvalidArgumentsErrorMessage(command, 'requires one file name'));
    }
    if (args.length > 1) {
        throw new Error(getInvalidArgumentsErrorMessage(command, 'accepts only one file name'));
    }
}