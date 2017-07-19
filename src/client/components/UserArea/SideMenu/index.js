import React from 'react'
import PropTypes from 'prop-types'
import { Menu } from 'semantic-ui-react'
import MenuLink from 'components/MenuLink'
import Icon from './Icon'

const SideMenu = ({ cardTotal, cardRememberTotal, cardWriteTotal }) =>
    <Menu vertical fluid size="huge">
        <Menu.Item>
            <Menu.Header>Словарь</Menu.Header>

            <Menu.Menu>
                <MenuLink to="/user/cards">
                    <Icon type="books" />
                    Мои слова
                    <div className="ui label">{cardTotal}</div>
                </MenuLink>
            </Menu.Menu>
        </Menu.Item>

        <Menu.Item>
            <Menu.Header>Изучение</Menu.Header>

            <Menu.Menu>
                <MenuLink to="/user/remember">
                    <Icon type="bubble2" />
                    Запоминание
                    <div className="ui label">{cardRememberTotal}</div>
                </MenuLink>
                <MenuLink to="/user/write">
                    <Icon type="pencil2" />
                    Написание
                    <div className="ui label">{cardWriteTotal}</div>
                </MenuLink>
                <MenuLink to="/user/mp3">
                    <Icon type="headphones" />
                    Скачать MP3
                </MenuLink>
            </Menu.Menu>
        </Menu.Item>

        <Menu.Item>
            <Menu.Header>Справочно</Menu.Header>

            <Menu.Menu>
                <MenuLink to="/user/statistics">
                    <Icon type="stats-dots" />
                    Статистика
                </MenuLink>
            </Menu.Menu>
        </Menu.Item>

        <Menu.Item>
            <Menu.Header>Настройки</Menu.Header>

            <Menu.Menu>
                <MenuLink to="/user/tasks">Задачи</MenuLink>
                <MenuLink to="/user/base">База слов</MenuLink>
            </Menu.Menu>
        </Menu.Item>
    </Menu>

SideMenu.propTypes = {
    cardTotal: PropTypes.number,
    cardRememberTotal: PropTypes.number,
    cardWriteTotal: PropTypes.number,
}

export default SideMenu
