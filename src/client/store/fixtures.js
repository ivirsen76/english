import { initialState } from 'reducers/card'

export const initialStore = {
    card: {
        ...initialState,
        list: [
            { id: 1, text: 'Text', translate: 'TextTranslate', status: 0, label: '' },
            { id: 2, text: 'Block', translate: 'BlockTranslate', status: 0, label: 'test' },
        ],
    },
}
