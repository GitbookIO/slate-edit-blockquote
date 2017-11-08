// @flow
import Options, { type OptionsFormat } from './options';
import { onKeyDown } from './handlers';
import core from './core';

/**
 * A Slate plugin to handle keyboard events in lists.
 */

function EditBlockquote(opts: OptionsFormat = {}) {
    opts = new Options(opts);

    const corePlugin = core(opts);

    return {
        ...corePlugin,
        onKeyDown: onKeyDown.bind(null, opts)
    };
}

export default EditBlockquote;
