const onEnter     = require('./onEnter');
const onTab       = require('./onTab');
const onBackspace = require('./onBackspace');
const makeSchema = require('./makeSchema');

const KEY_ENTER     = 'enter';
const KEY_TAB       = 'tab';
const KEY_BACKSPACE = 'backspace';


/**
 * A Slate plugin to handle keyboard events in lists.
 * @param {Object} [opts] Options for the plugin
 * @param {String} [opts.type='blockquote'] The type of unordered lists
 * @param {String} [opts.typeOL='ol_list'] The type of ordered lists
 * @param {String} [opts.typeItem='list_item'] The type of list items
 * @param {String} [opts.typeDefault='paragraph'] The type of default block in items
 * @return {Object}
 */

function EditBlockquote(opts) {
    opts             = opts || {};
    opts.type        = opts.type || 'blockquote';
    opts.typeDefault = opts.typeDefault || 'paragraph';

    /**
     * Bind a transform to be only applied in list
     */
    function bindTransform(fn) {
        return function(transform, ...args) {
            const { state } = transform;

            if (!isSelectionInList(state)) {
                return transform;
            }

            return fn(...[opts, transform].concat(args));
        };
    }

    /**
     * User is pressing a key in the editor
     */
    function onKeyDown(e, data, state) {
        // Build arguments list
        const args = [e, data, state, opts];

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

        schema
    };
}

module.exports = EditBlockquote;
