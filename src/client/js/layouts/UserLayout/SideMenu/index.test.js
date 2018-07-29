import React from 'react'
import { shallow } from 'enzyme'
import SideMenu from './index'

describe('<SideMenu />', () => {
    it('Should render menu', () => {
        const wrapper = shallow(
            <SideMenu cardTotal={3} cardRememberTotal={12} cardWriteTotal={7} />
        )
        expect(wrapper).toMatchSnapshot()
    })
})
