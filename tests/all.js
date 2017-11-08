import expect from 'expect';
import fs from 'fs';
import path from 'path';
import Slate from 'slate';
import readMetadata from 'read-metadata';

import EditBlockquote from '../lib';

describe('slate-edit-blockquote', () => {
    const tests = fs.readdirSync(__dirname);
    const plugin = EditBlockquote();

    tests.forEach(test => {
        if (test[0] === '.' || path.extname(test).length > 0) return;

        it(test, () => {
            const dir = path.resolve(__dirname, test);

            const inputPath = path.resolve(dir, 'input.yaml');
            const input = readMetadata.sync(inputPath);

            const expectedPath = path.resolve(dir, 'expected.yaml');
            let expected;
            if (fs.existsSync(expectedPath)) {
                expected = Slate.State.fromJSON(
                    readMetadata.sync(expectedPath)
                ).toJSON();
            }

            const runChange = require(path.resolve(dir, 'change.js')).default;

            const stateInput = Slate.State.fromJSON(input);

            const newChange = runChange(plugin, stateInput.change());

            if (expected) {
                const newDocJSon = newChange.state.toJSON();
                expect(newDocJSon).toEqual(expected);
            }
        });
    });
});
