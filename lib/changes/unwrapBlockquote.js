// @flow
import { type Change } from '@gitbook/slate';

import type Options from '../options';

/**
 * Unwrap from blockquote.
 */
function unwrapBlockquote(opts: Options, change: Change): Change {
    return change.unwrapBlock(opts.type);
}

export default unwrapBlockquote;
