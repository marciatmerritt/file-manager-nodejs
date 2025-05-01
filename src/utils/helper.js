import { MESSAGE_GREETING, MESSAGE_EXIT, MESSAGE_CURRENT_DIR } from "../constants/constants.js";

export const getGreetingMessage = (username) => `${MESSAGE_GREETING}${username}!`;
export const getExitMessage = (username) => `${MESSAGE_EXIT}${username}, goodbye!`;
export const getCurrentDirMessage = (cwd) => `${MESSAGE_CURRENT_DIR}${cwd}`;
