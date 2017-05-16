/* global describe, it, expect */
import React from 'react'
import { shallow } from 'enzyme'
import { toJson } from '@ieremeev/jest-setup'
import SideMenu from './index'

describe('<SideMenu />', () => {
    it('Should render menu', () => {
        const wrapper = shallow(<SideMenu cardTotal={3} />)
        expect(toJson(wrapper)).toMatchSnapshot()
    })
})
