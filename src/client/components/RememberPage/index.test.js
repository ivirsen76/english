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
        const wrapper = mount(<Component />).find(Counter)
        expect(wrapper.prop('current')).toBe(1)
        expect(wrapper.prop('total')).toBe(2)
    })
})
