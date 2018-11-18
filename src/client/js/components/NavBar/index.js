import React from 'react'
import { Dropdown, Menu, Modal } from 'semantic-ui-react'
import LoginForm from 'client/js/components/LoginForm'
import { isLoggedIn, getCurrentUser } from 'client/js/utils/auth.js'
import IconUser from '@ieremeev/icons/user'
import MenuLink from '../MenuLink'

export default class NavBar extends React.Component {
    render() {
        const user = getCurrentUser()

        return (
            <Menu inverted>
                <MenuLink to="/" exact>
                    Главная
                </MenuLink>
                <MenuLink to="/features">Возможности</MenuLink>
                <MenuLink to="/bases">Базы карточек</MenuLink>
                <Dropdown item text="Помощники">
                    <Dropdown.Menu>
                        <MenuLink to="/helpers/simpleMatrix">Матрица Simple</MenuLink>
                        <MenuLink to="/helpers/continuousMatrix">Матрица Continuous</MenuLink>
                        <MenuLink to="/helpers/numbers">Номера</MenuLink>
                    </Dropdown.Menu>
                </Dropdown>
                {isLoggedIn() ? (
                    <Menu.Menu position="right">
                        <MenuLink to="/user">Dashboard</MenuLink>
                        <Dropdown
                            item
                            trigger={
                                <span>
                                    <IconUser spaceRight />
                                    {user.email}
                                </span>
                            }
                        >
                            <Dropdown.Menu>
                                <Dropdown.Item>Сменить пароль</Dropdown.Item>
                                <MenuLink to="/logout">Выйти</MenuLink>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Menu.Menu>
                ) : (
                    <Menu.Menu position="right">
                        <Modal size="tiny" closeIcon trigger={<a className="item">Войти</a>}>
                            <Modal.Header>Войти</Modal.Header>
                            <Modal.Content>
                                <LoginForm />
                            </Modal.Content>
                        </Modal>
                    </Menu.Menu>
                )}
            </Menu>
        )
    }
}
