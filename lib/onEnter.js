const getCurrentBlockquote = require('./getCurrentBlockquote');
const unwrapBlockquote = require('./transforms/unwrapBlockquote');

/**
 * User pressed Enter in an editor
 *
 * Enter in a list item should split the list item
 * Enter in an empty list item should remove it
 * Shift+Enter in a list item should make a new line
 */
function onEnter(event, data, state, opts) {
    const { startBlock } = state;

    if (!getCurrentBlockquote(opts, state)) {
        return null;
    }

    // Block is empty, we exit the blockquote
    if (startBlock.length === 0) {
        event.preventDefault();

        return unwrapBlockquote(opts, state.transform()).apply();
    }

}

module.exports = onEnter;
