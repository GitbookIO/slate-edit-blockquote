
/**
 * Return the current blockquote, from current selection or from a node.
 *
 * @param {PluginOptions} opts
 * @param {Slate.State} state
 * @param {Slate.Block} block?
 * @return {Slate.Block || Void}
 */
function getCurrentBlockquote(opts, state, block) {
    const { document } = state;

    if (!block) {
        if (!state.selection.startKey) return null;
        block = state.startBlock;
    }

    return block.type === opts.type
        ? block
        : document.getClosest(block.key, n => n.type === opts.type);
}

module.exports = getCurrentBlockquote;
