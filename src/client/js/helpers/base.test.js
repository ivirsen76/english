import { getParents } from './base.js'

describe('getParents', () => {
    it('Should return parents array', () => {
        const bases = [
            { id: 1, title: 'One', parentId: 0 },
            { id: 2, title: 'Two', parentId: 1 },
            { id: 3, title: 'Three', parentId: 2 },
            { id: 4, title: 'Four', parentId: 0 },
        ]
        const expectedParents = [
            { id: 1, title: 'One', parentId: 0 },
            { id: 2, title: 'Two', parentId: 1 },
        ]
        expect(getParents(bases, 3)).toEqual(expectedParents)
    })
})
