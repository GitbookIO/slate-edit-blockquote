// @flow
import { Record } from 'immutable';

const DEFAULTS = {
    type: 'blockquote',
    typeDefault: 'paragraph',
    exitBlockType: 'paragraph'
};

/**
 * The plugin options container
 */
class Options extends Record(DEFAULTS) {
    type: string;
    typeDefault: string;
    exitBlockType: string;
}

export type OptionsFormat = {
    type?: string, // type for blockquotes
    typeDefault?: string, // type for default block in blockquote.
    exitBlockType?: string // type of block inserted when exiting
};

export default Options;
