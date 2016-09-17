
/**
 * Wrap the block in a new blockquote.
 *
 * @param  {PluginOptions} opts
 * @param  {Slate.Transform} transform
 * @return {Transform} transform
 */
function wrapInBlockquote(opts, transform) {
    return transform
        .wrapBlock(opts.type);
}

module.exports = wrapInBlockquote;
