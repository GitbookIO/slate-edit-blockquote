export default function(plugin, change) {
    const selectedBlock = change.value.document.getDescendant('_selection_key');
    change.collapseToStartOf(selectedBlock);

    plugin.onKeyDown(
        {
            preventDefault() {},
            stopPropagation() {},
            key: 'Enter'
        },
        change,
        {}
    );

    return change;
}
