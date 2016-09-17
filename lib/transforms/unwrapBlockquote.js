
/**
 * Unwrap from blockquote.
 *
 * @param  {PluginOptions} opts
 * @param  {Slate.Transform} transform
 * @return {Transform} transform
 */
function unwrapBlockquote(opts, transform) {
    return transform
        .unwrapBlock(opts.type);
}

module.exports = unwrapBlockquote;
