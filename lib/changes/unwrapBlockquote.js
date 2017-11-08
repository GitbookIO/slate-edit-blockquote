/**
 * Unwrap from blockquote.
 *
 * @param  {PluginOptions} opts
 * @param  {Slate.Change} change
 * @return {Change} change
 */
function unwrapBlockquote(opts, change) {
    return change.unwrapBlock(opts.type);
}

export default unwrapBlockquote;
