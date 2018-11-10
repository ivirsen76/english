import { stripBrackets } from './utils.js'

describe('stripBrackets()', () => {
    it('Should strip brackets', () => {
        expect(stripBrackets(' some (one) ')).toBe('some')
    })

    it('Should strip brackets with brackets inside', () => {
        expect(stripBrackets(' some (on(e)two) ')).toBe('some two)')
    })
})
