import { stderr, stdout } from 'process';

/**
 * Logs a styled message to the terminal based on the specified message type.
 *
 * Supports color-coded output, optional emojis, and type-specific labels like "ERROR:" or "SUCCESS:".
 * Outputs to either `stdout` or `stderr` depending on the message type.
 *
 * @param {string} message - The message to be logged.
 * @param {'error' | 'warn' | 'prompt' | 'success' | 'info'} [type='info'] - The type of message.
 *   - `'error'`: Logs to stderr in red with ❌ and "ERROR:" label.
 *   - `'warn'`: Logs to stderr in yellow with ⚠️ and "WARNING:" label.
 *   - `'prompt'`: Logs to stderr in yellow with no emoji or label.
 *   - `'success'`: Logs to stdout in green with ✅ and "SUCCESS:" label.
 *   - `'info'`: Logs to stdout in default color with no emoji or label.
 *
 * @example
 * logger('Something went wrong.', 'error');
 * logger('Operation might be risky.', 'warn');
 * logger('What would you like to do next?', 'prompt');
 * logger('Operation completed successfully!', 'success');
 * logger('Welcome to the File Manager.', 'info');
 */

export const logger = (message, type = 'info') => {
    const reset = '\x1b[0m';
    const formatters = {
        error: { color: '\x1b[31m', emoji: '❌', label: 'ERROR:' },
        warn: { color: '\x1b[33m', emoji: '⚠️', label: 'WARNING:' },
        prompt: { color: '\x1b[33m', emoji: '👉', label: '' },
        success: { color: '\x1b[32m', emoji: '✅', label: 'SUCCESS:' },
        info: { color: '\x1b[0m', emoji: '', label: '' },
    };

    const { color, emoji, label } = formatters[type] || formatters.info;
    const prefix = [emoji, label].filter(Boolean).join(' ');

    const formattedMessage = `${color}${prefix}${reset} ${message}`;

    if (type === 'error' || type === 'warn' || type === 'prompt') {
        stderr.write(formattedMessage + '\n');
    } else {
        stdout.write(formattedMessage + '\n');
    }
};