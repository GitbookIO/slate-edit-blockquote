import expect from 'expect';

export default function(plugin, change) {
    const { document } = change.value;
    const noquote = document.getDescendant('noquote');
    const quote = document.getDescendant('quote');
    const quotedeep = document.getDescendant('quotedeep');

    expect(
        plugin.utils.isSelectionInBlockquote(
            change.collapseToStartOf(noquote).value
        )
    ).toBe(false);
    expect(
        plugin.utils.isSelectionInBlockquote(
            change.collapseToStartOf(quote).value
        )
    ).toBe(true);
    expect(
        plugin.utils.isSelectionInBlockquote(
            change.collapseToStartOf(quotedeep).value
        )
    ).toBe(false);
}
