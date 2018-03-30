import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'js/utils/toJson'
import TopMenu from './index'

describe('<TopMenu />', () => {
    it('Should render menu', () => {
        const wrapper = shallow(<TopMenu />)
        expect(toJson(wrapper)).toMatchSnapshot()
    })

    it('Should render menu for logged user', () => {
        const wrapper = shallow(<TopMenu isLoggedIn user={{ email: 'some@one.com' }} />)
        expect(toJson(wrapper)).toMatchSnapshot()
    })
})
