import Slate from 'slate';

/**
 * Create a schema for blockquotes
 * @param {String} opts.type The type of blockquote
 * @param {String} opts.typeDefault The type of the default block in blockquotes
 * @return {Object} A schema definition with rules to normalize blockquotes
 */
function makeSchema(opts) {
    return {
        rules: [containBlocks(opts)]
    };
}

/**
 *  @param {String} opts.type The type of blockquote
 *  @param {String} opts.typeDefault The type of the default block in blockquotes
 *  @return {Object} A rule that ensure blockquotes always contain
 *  blocks.
 */
function containBlocks(opts) {
    return {
        match(node) {
            return node.type == opts.type;
        },

        validate(item) {
            // Wrap text/inline nodes in default block
            const toWrap = item.nodes.filter(node => node.kind !== 'block');

            return toWrap.isEmpty() ? null : { toWrap };
        },

        /**
         * Wraps the given nodes in one default block
         * @param {List<Nodes>} value.toWrap
         */
        normalize(change, node, value) {
            let wrapper = Slate.Block.create({
                type: opts.typeDefault
            });
            // Remove extra empty text
            wrapper = wrapper.set('nodes', wrapper.nodes.slice(0, 0));

            change.insertNodeByKey(
                node.key,
                0,
                wrapper,
                // Be careful of Slate's core schema removing inlines or blocks when
                // a block contains a mix of them.
                { normalize: false }
            );

            value.toWrap.forEach((child, index) => {
                const isLast = index === value.toWrap.length - 1;
                change.moveNodeByKey(child.key, wrapper.key, index, {
                    normalize: isLast
                });
            });

            return change;
        }
    };
}

export default makeSchema;
