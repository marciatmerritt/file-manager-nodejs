import { argv } from "node:process";
import { INVALID_USERNAME_FORMAT_MSG, USERNAME_NOT_PROVIDED_MSG } from "../constants/errorConstants.js";

/**
 * Extracts and validates the username from CLI arguments.
 *
 * Looks for a `--username=<name>` argument passed via the command line,
 * trims surrounding whitespace, and returns the username if valid.
 *
 * @throws {Error} If the `--username` argument is not provided.
 * @throws {Error} If the username is empty or contains only whitespace.
 *
 * @returns {string} The trimmed username provided via the `--username` flag.
 *
 * @example
 * // Command: node src/index.js --username=Marcia
 * const username = getUsername(); // "Marcia"
 */
export const getUsername = () => {
    
    const args = argv.slice(2);
    const usernameArg = args.find(arg => arg.startsWith('--username='));

    if (!usernameArg) {
        throw new Error(USERNAME_NOT_PROVIDED_MSG);
    }

    const username = usernameArg.split('=')[1]?.trim();
    
    if (!username) {
        throw new Error(INVALID_USERNAME_FORMAT_MSG);
    }

    return username;
}