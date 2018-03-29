import diff from './diff.js'

it('Should return strings difference', () => {
    const str1 = 'textA,:'
    const str2 = 'TextB.'

    expect(diff(str1, str2)).toEqual([{ text: 'text' }, { text: 'A', added: true }, { text: ',:' }])
    expect(diff(str2, str1)).toEqual([{ text: 'Text' }, { text: 'B', added: true }, { text: '.' }])
})
