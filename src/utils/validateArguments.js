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

/**
 * Validates that the args array has exactly two arguments.
 *
 * @param {string[]} args - The command-line arguments.
 * @param {string} commandName - The name of the CLI command (e.g., "cp").
 * @throws {Error} If no arguments, one argument, or more than two arguments is provided.
 */
export const validateTwoArguments = (command, args) => {
    if (args.length === 0 || args.length === 1) {
        throw new Error(getInvalidArgumentsErrorMessage(command, 'requires two file names'));
    }
    if (args.length > 2) {
        throw new Error(getInvalidArgumentsErrorMessage(command, 'accepts only tw0 file names'));
    }
}