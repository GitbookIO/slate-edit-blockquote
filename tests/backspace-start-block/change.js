export default function(plugin, change) {
    const selectedBlock = change.state.document.getDescendant('_selection_key');
    change.collapseToStartOf(selectedBlock);

    plugin.onKeyDown(
        {
            preventDefault() {},
            stopPropagation() {}
        },
        { key: 'backspace' },
        change
    );

    return change;
};
