import React from 'react'
import { Dropdown, Menu, Modal } from 'semantic-ui-react'
import MenuLink from '../MenuLink'
import LoginForm from 'client/js/components/LoginForm'
import { isLoggedIn, getCurrentUser } from 'client/js/utils/auth.js'

export default class NavBar extends React.Component {
    render() {
        const user = getCurrentUser()

        return (
            <Menu inverted>
                <MenuLink to="/" exact>
                    Home
                </MenuLink>
                <MenuLink to="/features">Features</MenuLink>
                <Menu.Item>Card base</Menu.Item>
                <Dropdown item text="Helpers">
                    <Dropdown.Menu>
                        <Dropdown.Item>Matrix Simple</Dropdown.Item>
                        <Dropdown.Item>Matrix Continuous</Dropdown.Item>
                        <Dropdown.Item>Numbers</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                {isLoggedIn() ? (
                    <Menu.Menu position="right">
                        <MenuLink to="/user">Dashboard</MenuLink>
                        <Dropdown
                            item
                            trigger={
                                <span>
                                    <i className="icon-user" /> {user.email}
                                </span>
                            }
                        >
                            <Dropdown.Menu>
                                <Dropdown.Item>Change password</Dropdown.Item>
                                <MenuLink to="/logout">Log out</MenuLink>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Menu.Menu>
                ) : (
                    <Menu.Menu position="right">
                        <Modal size="small" closeIcon trigger={<a className="item">Log in</a>}>
                            <Modal.Header>Log in</Modal.Header>
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
