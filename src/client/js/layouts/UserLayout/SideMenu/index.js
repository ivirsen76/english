import React from 'react'
import PropTypes from 'prop-types'
import { Menu } from 'semantic-ui-react'
import MenuLink from 'js/components/MenuLink'
import Icon from './Icon'

const SideMenu = ({ cardTotal, cardRememberTotal, cardWriteTotal }) => (
    <Menu vertical fluid size="huge">
        <Menu.Item>
            <Menu.Header>Vocabulary</Menu.Header>

            <Menu.Menu>
                <MenuLink to="/user/cards">
                    <Icon type="books" />
                    My cards
                    <div className="ui label">{cardTotal}</div>
                </MenuLink>
            </Menu.Menu>
        </Menu.Item>

        <Menu.Item>
            <Menu.Header>Learning</Menu.Header>

            <Menu.Menu>
                <MenuLink to="/user/remember">
                    <Icon type="bubble2" />
                    Remember
                    <div className="ui label">{cardRememberTotal}</div>
                </MenuLink>
                <MenuLink to="/user/write">
                    <Icon type="pencil2" />
                    Write
                    <div className="ui label">{cardWriteTotal}</div>
                </MenuLink>
                <MenuLink to="/user/mp3">
                    <Icon type="headphones" />
                    Download MP3
                </MenuLink>
            </Menu.Menu>
        </Menu.Item>

        <Menu.Item>
            <Menu.Header>Other</Menu.Header>

            <Menu.Menu>
                <MenuLink to="/user/statistics">
                    <Icon type="stats-dots" />
                    Statistics
                </MenuLink>
                <MenuLink to="/user/base">
                    <Icon type="library" />
                    Bases
                </MenuLink>
            </Menu.Menu>
        </Menu.Item>
    </Menu>
)

SideMenu.propTypes = {
    cardTotal: PropTypes.number,
    cardRememberTotal: PropTypes.number,
    cardWriteTotal: PropTypes.number,
}

export default SideMenu
