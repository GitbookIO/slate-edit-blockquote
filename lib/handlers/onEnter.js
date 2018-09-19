// @flow
import { type Change } from '@gitbook/slate';

import type Options from '../options';
import { getCurrentBlockquote } from '../utils';
import { unwrapBlockquote } from '../changes/';

/**
 * User pressed Enter in an editor
 *
 * Enter on an empty block inside a blockquote exit the blockquote.
 */
function onEnter(opts: Options, event: *, change: Change, editor: *) {
    const { value } = change;
    const { startBlock } = value;

    if (!getCurrentBlockquote(opts, value)) {
        return undefined;
    }

    if (startBlock.text.length !== 0) {
        return undefined;
    }

    // Block is empty, we exit the blockquote
    event.preventDefault();
    return unwrapBlockquote(opts, change);
}

export default onEnter;
