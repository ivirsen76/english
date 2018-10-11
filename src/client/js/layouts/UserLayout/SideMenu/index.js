import React from 'react'
import PropTypes from 'prop-types'
import { Menu } from 'semantic-ui-react'
import MenuLink from 'client/js/components/MenuLink'
import Icon from './Icon'
import { hasRole } from 'client/js/utils/auth.js'

const SideMenu = ({ cardTotal, cardRememberTotal, cardWriteTotal }) => (
    <Menu vertical fluid size="huge">
        <Menu.Item>
            <Menu.Header>Словарь</Menu.Header>

            <Menu.Menu>
                <MenuLink to="/user/cards">
                    <Icon type="books" />
                    Мои слова
                    <div className="ui label" id="cardTotal">
                        {cardTotal}
                    </div>
                </MenuLink>
                <MenuLink to="/user/baseBrowser">
                    <Icon type="books" />
                    Добавить из баз
                </MenuLink>
            </Menu.Menu>
        </Menu.Item>

        <Menu.Item>
            <Menu.Header>Обучение</Menu.Header>

            <Menu.Menu>
                <MenuLink to="/user/remember">
                    <Icon type="bubble2" />
                    Запомнить
                    <div className="ui label">{cardRememberTotal}</div>
                </MenuLink>
                <MenuLink to="/user/write">
                    <Icon type="pencil2" />
                    Написать
                    <div className="ui label">{cardWriteTotal}</div>
                </MenuLink>
                <MenuLink to="/user/mp3">
                    <Icon type="headphones" />
                    Скачать MP3
                </MenuLink>
            </Menu.Menu>
        </Menu.Item>

        <Menu.Item>
            <Menu.Header>Другое</Menu.Header>

            <Menu.Menu>
                <MenuLink to="/user/statistics">
                    <Icon type="stats-dots" />
                    Статистика
                </MenuLink>
                {hasRole('admin') && (
                    <MenuLink to="/user/base">
                        <Icon type="library" />
                        Базы
                    </MenuLink>
                )}
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
