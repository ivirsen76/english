import { convertText } from './index.js'

it('Should return converted text', () => {
    expect(convertText(' -%,.:!?[]/tExt')).toBe('text')
})
