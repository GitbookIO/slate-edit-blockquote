// @flow
import { type Block, type Value } from '@gitbook/slate';
import type Options from '../options';

/**
 * Return the current blockquote, from current selection or from a node.
 */
function getCurrentBlockquote(
    opts: Options,
    value: Value,
    block?: Block
): ?Block {
    const { document } = value;

    if (!block) {
        if (!value.selection.startKey) return null;
        block = value.startBlock;
    }

    const parent = document.getParent(block.key);

    return parent && parent.type === opts.type ? parent : null;
}

export default getCurrentBlockquote;
