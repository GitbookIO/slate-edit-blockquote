// @flow
/* eslint-disable import/no-extraneous-dependencies */
/* global document */
import React from 'react';
import ReactDOM from 'react-dom';
import { Editor } from 'slate-react';
import PluginEditBlockquote from '../lib/';

import INITIAL_VALUE from './value';

const plugin = PluginEditBlockquote();
const plugins = [plugin];

function renderNode(props: *) {
    const { node, children, attributes } = props;
    switch (node.type) {
        case 'blockquote':
            return <blockquote {...attributes}>{children}</blockquote>;
        case 'paragraph':
            return <p {...attributes}>{children}</p>;
        case 'heading':
            return <h1 {...attributes}>{children}</h1>;
        default:
            return null;
    }
}

class Example extends React.Component<*, *> {
    state = {
        value: INITIAL_VALUE
    };

    onChange = ({ value }) => {
        this.setState({
            value
        });
    };

    onWrapInBlockquote = e => {
        const { value } = this.state;

        this.onChange(plugin.changes.wrapInBlockquote(value.change()));
    };

    onUnwrapBlockquote = e => {
        const { value } = this.state;

        this.onChange(plugin.changes.unwrapBlockquote(value.change()));
    };

    render() {
        const { value } = this.state;
        const inBlockquote = plugin.utils.isSelectionInBlockquote(value);

        return (
            <div>
                <div>
                    <button onClick={this.onWrapInBlockquote}>
                        Blockquote
                    </button>
                    <button
                        onClick={this.onUnwrapBlockquote}
                        disabled={!inBlockquote}
                    >
                        Unwrap
                    </button>
                </div>
                <Editor
                    placeholder={'Enter some text...'}
                    plugins={plugins}
                    value={value}
                    onChange={this.onChange}
                    renderNode={renderNode}
                />
            </div>
        );
    }
}

// $FlowFixMe
ReactDOM.render(<Example />, document.getElementById('example'));
