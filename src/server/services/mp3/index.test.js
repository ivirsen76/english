import { getPauseLength } from './index.js'

it('getPauseLength()', () => {
    expect(getPauseLength(1)).toBe(500)
    expect(getPauseLength(1249)).toBe(1000)
    expect(getPauseLength(1250)).toBe(1500)
    expect(getPauseLength(10000)).toBe(5000)
})
