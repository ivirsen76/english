import { getBaseCardsToAdd } from './common'

describe('getBaseCardsToAdd()', () => {
    it('Should return cards to add', () => {
        const state = {
            app: {
                card: {
                    list: [{ text: 'Calendar (some)' }, { text: 'another', basecardId: 5 }],
                },
                base: {
                    cards: [
                        { id: 4, text: 'Calendar (another).' },
                        { id: 5, text: 'foo' },
                        { id: 6, text: 'bar' },
                        { id: 7, text: 'calendar ' },
                        { id: 8, text: 'calendar.' },
                    ],
                },
            },
        }

        expect(getBaseCardsToAdd(state)).toEqual([6])
    })
})
