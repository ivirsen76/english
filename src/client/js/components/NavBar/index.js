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
                <MenuLink to="/bases">Card base</MenuLink>
                <Dropdown item text="Helpers">
                    <Dropdown.Menu>
                        <MenuLink to="/helpers/simpleMatrix">Matrix Simple</MenuLink>
                        <MenuLink to="/helpers/continuousMatrix">Matrix Continuous</MenuLink>
                        <MenuLink to="/helpers/numbers">Numbers</MenuLink>
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
