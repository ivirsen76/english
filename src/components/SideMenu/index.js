import React, { PropTypes } from 'react'
import { Menu } from 'semantic-ui-react'
import MenuLink from 'components/MenuLink'


const SideMenu = ({ cardTotal }) => (
    <Menu vertical fluid size="large">
        <Menu.Item>
            <Menu.Header>Словарь</Menu.Header>

            <Menu.Menu>
                <MenuLink to="/user/cards">
                    Мои слова
                    <div className="ui label">{cardTotal}</div>
                </MenuLink>
            </Menu.Menu>
        </Menu.Item>

        <Menu.Item>
            <Menu.Header>Изучение</Menu.Header>

            <Menu.Menu>
                <MenuLink to="/user/remember">
                    Запоминание
                    <div className="ui label">12</div>
                </MenuLink>
                <MenuLink to="/user/write">
                    Написание
                    <div className="ui label">7</div>
                </MenuLink>
                <MenuLink to="/user/mp3">
                    Скачать MP3
                </MenuLink>
            </Menu.Menu>
        </Menu.Item>

        <Menu.Item>
            <Menu.Header>Справочно</Menu.Header>

            <Menu.Menu>
                <MenuLink to="/user/statistics">
                    Статистика
                </MenuLink>
            </Menu.Menu>
        </Menu.Item>

        <Menu.Item>
            <Menu.Header>Настройки</Menu.Header>

            <Menu.Menu>
                <MenuLink to="/user/tasks">
                    Задачи
                </MenuLink>
                <MenuLink to="/user/base">
                    База слов
                </MenuLink>
            </Menu.Menu>
        </Menu.Item>
    </Menu>
)

SideMenu.propTypes = {
    cardTotal: PropTypes.number,
}

export default SideMenu
