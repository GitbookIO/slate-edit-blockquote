// @flow
import { type Value } from 'slate';
import type Options from '../options';

import getCurrentBlockquote from './getCurrentBlockquote';

/**
 * Is the selection in a blockquote
 */
function isSelectionInBlockquote(opts: Options, value: Value): boolean {
    return Boolean(getCurrentBlockquote(opts, value));
}

export default isSelectionInBlockquote;
