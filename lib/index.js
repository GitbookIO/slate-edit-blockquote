import onEnter from './onEnter';
import onTab from './onTab';
import onBackspace from './onBackspace';
import makeSchema from './makeSchema';

import getCurrentBlockquote from './getCurrentBlockquote';
import wrapInBlockquote from './changes/wrapInBlockquote';
import unwrapBlockquote from './changes/unwrapBlockquote';

const KEY_ENTER = 'enter';
const KEY_TAB = 'tab';
const KEY_BACKSPACE = 'backspace';

/**
 * A Slate plugin to handle keyboard events in lists.
 * @param {Object} [opts] Options for the plugin
 * @param {String} [opts.type='blockquote'] The type for quote blocks
 * @param {String} [opts.type='paragraph'] The default type for blocks inside quotes
 * @return {Object}
 */

function EditBlockquote(opts) {
    opts = opts || {};
    opts.type = opts.type || 'blockquote';
    opts.typeDefault = opts.typeDefault || 'paragraph';

    /**
     * Is the selection in a blockquote
     */
    function isSelectionInBlockquote(state) {
        return Boolean(getCurrentBlockquote(opts, state));
    }

    /**
     * Bind a change to be only applied in list
     */
    function bindChange(fn) {
        return function(change, ...args) {
            const { state } = change;

            if (!isSelectionInBlockquote(state)) {
                return change;
            }

            return fn(...[opts, change].concat(args));
        };
    }

    /**
     * User is pressing a key in the editor
     */
    function onKeyDown(e, data, change) {
        // Build arguments list
        const args = [e, data, change, opts];

        switch (data.key) {
            case KEY_ENTER:
                return onEnter(...args);
            case KEY_TAB:
                return onTab(...args);
            case KEY_BACKSPACE:
                return onBackspace(...args);
        }
    }

    const schema = makeSchema(opts);

    return {
        onKeyDown,
        schema,

        utils: {
            isSelectionInBlockquote
        },

        changes: {
            wrapInBlockquote: wrapInBlockquote.bind(null, opts),
            unwrapBlockquote: bindChange(unwrapBlockquote)
        }
    };
}

export default EditBlockquote;
