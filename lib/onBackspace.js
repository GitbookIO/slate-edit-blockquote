const getCurrentBlockquote = require('./getCurrentBlockquote');
const unwrapBlockquote = require('./transforms/unwrapBlockquote');

/**
 * User pressed Delete in an editor:
 * Unwrap the blockquote if at the start of the inner block.
 */
function onBackspace(event, data, state, opts) {
    const { startOffset, isCollapsed } = state;

    if (!getCurrentBlockquote(opts, state) || !isCollapsed) {
        return null;
    }

    // Block is empty, we exit the blockquote
    if (startOffset === 0) {
        event.preventDefault();

        return unwrapBlockquote(opts, state.transform()).apply();
    }
}

module.exports = onBackspace;
