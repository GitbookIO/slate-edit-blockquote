import getCurrentBlockquote from './getCurrentBlockquote';
import unwrapBlockquote from './changes/unwrapBlockquote';

/**
 * User pressed Delete in an editor:
 * Unwrap the blockquote if at the start of the inner block.
 */
function onBackspace(event, data, change, opts) {
    const { state } = change;
    const { startOffset, isCollapsed } = state;

    if (!getCurrentBlockquote(opts, state) || !isCollapsed) {
        return null;
    }

    // Block is empty, we exit the blockquote
    if (startOffset === 0) {
        event.preventDefault();

        return unwrapBlockquote(opts, change);
    }
}

export default onBackspace;
