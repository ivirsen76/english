import React from 'react'
import { mount } from 'enzyme'
import Remember from './index'
import Counter from './Counter'
import NextButton from './NextButton'
import { configureStoreProd } from 'store/configureStore'
import { initialStore } from 'store/fixtures'

let Component

describe('Remember page', () => {
    beforeEach(() => {
        const store = configureStoreProd(initialStore)
        Component = () => <Remember store={store} />
    })

    it('Should render right counter', () => {
        const counter = mount(<Component />).find(Counter)
        expect(counter.html()).toContain('1 / 2')
    })

    it('Should filter list using existing label', () => {
        const wrapper = mount(<Component />)
        const input = wrapper.find('#remember_label_input')
        const counter = wrapper.find(Counter)

        input.simulate('change', { target: { value: 'test' } })
        expect(counter.html()).toContain('1 / 1')
    })

    it('Should filter list using unknown label', () => {
        const wrapper = mount(<Component />)
        const input = wrapper.find('#remember_label_input')

        input.simulate('change', { target: { value: 'unknown' } })
        expect(wrapper.html()).toContain('No cards to show')
    })

    it('Should go to the next card', () => {
        const wrapper = mount(<Component />)
        const nextButton = wrapper.find(NextButton)
        const usWord = wrapper.find('#panel_us_word')
        const ruWord = wrapper.find('#panel_ru_word')

        expect(usWord.html()).toContain('Text')
        expect(ruWord.html()).not.toContain('TextTranslate')

        nextButton.simulate('click')
        expect(ruWord.html()).toContain('TextTranslate')

        nextButton.simulate('click')
        expect(usWord.html()).toContain('Block')
        expect(ruWord.html()).not.toContain('Block')
    })
})
