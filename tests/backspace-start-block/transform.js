
module.exports = function(plugin, state) {
    const selectedBlock = state.document.getDescendant('_selection_key');
    const transform = state.transform();
    state = transform.collapseToStartOf(selectedBlock).apply();

    return plugin.onKeyDown(
        {
            preventDefault() {},
            stopPropagation() {}
        },
        { key: 'backspace' },
        state
    );
};
