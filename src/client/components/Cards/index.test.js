import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'utils/toJson'
import { Cards } from './index'

describe('<Cards />', () => {
    it('Should render table', () => {
        const data = [{ id: 1, text: 'Tree', translate: 'Дерево' }]

        const wrapper = shallow(<Cards data={data} />)
        expect(toJson(wrapper)).toMatchSnapshot()
    })
})
