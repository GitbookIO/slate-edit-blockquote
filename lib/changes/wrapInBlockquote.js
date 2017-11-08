/**
 * Wrap the block in a new blockquote.
 *
 * @param  {PluginOptions} opts
 * @param  {Slate.Change} change
 * @return {Change} change
 */
function wrapInBlockquote(opts, change) {
    return change.wrapBlock(opts.type);
}

module.exports = wrapInBlockquote;
