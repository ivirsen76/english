import { convertText, isTextEqual } from './text.js'

describe('convertText()', () => {
    it('Should return converted text', () => {
        expect(convertText(' -%,.:!?[]/tExt')).toBe('text')
    })
})

describe('isTextEqual', () => {
    it('Should be equal', () => {
        expect(isTextEqual('Some', 'some,:[]!?')).toBe(true)
    })

    it('Should not be equal', () => {
        expect(isTextEqual('Some', 'Mome')).toBe(false)
    })
})
