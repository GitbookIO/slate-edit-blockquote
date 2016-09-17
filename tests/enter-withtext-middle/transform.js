const expect = require('expect');

module.exports = function(plugin, state) {
    const selectedBlock = state.document.getDescendant('_selection_key');
    const transform = state.transform();
    state = transform.collapseToStartOf(selectedBlock).apply();


    const newState = plugin.onKeyDown(
        {
            preventDefault() {},
            stopPropagation() {}
        },
        { key: 'enter' },
        state
    );

    expect(newState).toBeFalsy();

    return state;
};
