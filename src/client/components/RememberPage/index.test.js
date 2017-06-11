import React from 'react'
import { mount } from 'enzyme'
import Remember from './index'
import Counter from './Counter'
import { configureStoreProd } from 'store/configureStore'
import { initialStore } from 'store/fixtures'

const store = configureStoreProd(initialStore)
const Component = () => <Remember store={store} />

describe('Remember page', () => {
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
})
