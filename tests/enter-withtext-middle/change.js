import expect from 'expect';

export default function(plugin, change) {
    const selectedBlock = change.value.document.getDescendant('_selection_key');
    change.collapseToStartOf(selectedBlock);

    const newChange = plugin.onKeyDown(
        {
            preventDefault() {},
            stopPropagation() {},
            key: 'Enter'
        },
        change,
        {}
    );

    expect(newChange).toBe(undefined);

    return change;
}
