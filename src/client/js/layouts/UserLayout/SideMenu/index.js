import React from 'react'
import PropTypes from 'prop-types'
import { Menu } from 'semantic-ui-react'
import MenuLink from 'client/js/components/MenuLink'
import { hasRole } from 'client/js/utils/auth.js'
import IconDownload from '@ieremeev/icons/download'
import IconBooks from '@ieremeev/icons/books'
import IconBubble from '@ieremeev/icons/bubble2'
import IconPencil from '@ieremeev/icons/pencil2'
import IconStats from '@ieremeev/icons/stats-dots'
import IconLibrary from '@ieremeev/icons/library'

const SideMenu = ({ cardTotal, cardRememberTotal, cardWriteTotal }) => (
    <Menu id="sideMenu" vertical fluid size="huge">
        <Menu.Item>
            <Menu.Header>Словарь</Menu.Header>

            <Menu.Menu>
                <MenuLink to="/user/cards">
                    <IconBooks spaceRight />
                    Мои слова
                    <div className="ui label" id="cardTotal">
                        {cardTotal}
                    </div>
                </MenuLink>
                <MenuLink to="/user/baseBrowser">
                    <IconDownload spaceRight />
                    Добавить из баз
                </MenuLink>
            </Menu.Menu>
        </Menu.Item>

        <Menu.Item>
            <Menu.Header>Обучение</Menu.Header>

            <Menu.Menu>
                <MenuLink id="rememberMenuItem" to="/user/remember">
                    <IconBubble spaceRight />
                    Запомнить
                    <div className="ui label">{cardRememberTotal}</div>
                </MenuLink>
                <MenuLink id="writeMenuItem" to="/user/write">
                    <IconPencil spaceRight />
                    Написать
                    <div className="ui label">{cardWriteTotal}</div>
                </MenuLink>
                {/* <MenuLink to="/user/mp3"> */}
                {/*     <Icon type="headphones" /> */}
                {/*     Скачать MP3 */}
                {/* </MenuLink> */}
            </Menu.Menu>
        </Menu.Item>

        {hasRole('admin') && (
            <Menu.Item>
                <Menu.Header>Другое</Menu.Header>

                <Menu.Menu>
                    <MenuLink to="/user/statistics">
                        <IconStats spaceRight />
                        Статистика
                    </MenuLink>
                    <MenuLink to="/user/base">
                        <IconLibrary spaceRight />
                        Базы
                    </MenuLink>
                </Menu.Menu>
            </Menu.Item>
        )}
    </Menu>
)

SideMenu.propTypes = {
    cardTotal: PropTypes.number,
    cardRememberTotal: PropTypes.number,
    cardWriteTotal: PropTypes.number,
}

export default SideMenu
