// @flow
import { Block, type Change, type Node } from '@gitbook/slate';

import type Options from '../options';

type Normalizer = Change => any;

/**
 * Return a validateNode function for blockquotes
 */
function validateNode(opts: Options): Node => void | Normalizer {
    return node => containBlocks(opts, node);
}

/**
 *  Ensures that blockquotes always contain blocks.
 */
function containBlocks(opts: Options, node: Node): void | Normalizer {
    if (node.type !== opts.type) {
        return undefined;
    }

    const toWrap = node.nodes.filter(n => n.kind !== 'block');

    if (toWrap.isEmpty()) {
        return undefined;
    }

    return (change: Change): Change => {
        // Wrap text/inline nodes in default block
        const wrapper = Block.create({
            type: opts.typeDefault,
            nodes: []
        });

        change.insertNodeByKey(
            node.key,
            0,
            wrapper,
            // Be careful of Slate's core schema removing inlines or blocks when
            // a block contains a mix of them.
            { normalize: false }
        );

        toWrap.forEach((child, index) => {
            const isLast = index === toWrap.size - 1;
            change.moveNodeByKey(child.key, wrapper.key, index, {
                normalize: isLast
            });
        });

        return change;
    };
}

export default validateNode;
