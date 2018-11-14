import { convertText, isTextEqual, removeMeta } from './text.js'

describe('convertText()', () => {
    it('Should return converted text', () => {
        expect(convertText(' `-%,.:!?[]/tExt')).toBe('text')
    })
})

describe('isTextEqual', () => {
    it('Should be equal', () => {
        expect(isTextEqual('Some', 'some,:[]!?`')).toBe(true)
    })

    it('Should not be equal', () => {
        expect(isTextEqual('Some', 'Mome')).toBe(false)
    })
})

describe('removeMeta', () => {
    it('Should remove stress character', () => {
        expect(removeMeta('So`m`e')).toBe('Some')
    })
})
