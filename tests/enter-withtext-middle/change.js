import expect from 'expect';

export default function(plugin, change) {
    const selectedBlock = change.state.document.getDescendant('_selection_key');
    change.collapseToStartOf(selectedBlock);

    const newChange = plugin.onKeyDown(
        {
            preventDefault() {},
            stopPropagation() {}
        },
        { key: 'enter' },
        change
    );

    expect(newChange).toBeFalsy();

    return change;
};
