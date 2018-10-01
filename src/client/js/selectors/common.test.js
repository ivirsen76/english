import { getAddedCards } from './common'

describe('getAddedCards()', () => {
    it('Should return added cards', () => {
        const state = {
            app: {
                card: {
                    list: [{ text: 'Calendar (some)' }, { text: 'another', basecardId: 5 }],
                },
                base: {
                    cards: [
                        { id: 4, text: 'Calendar (another)' },
                        { id: 5, text: 'foo' },
                        { id: 6, text: 'bar' },
                    ],
                },
            },
        }

        expect(getAddedCards(state)).toEqual([4, 5])
    })
})
