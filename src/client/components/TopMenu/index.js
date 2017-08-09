import React from 'react'
import PropTypes from 'prop-types'
import { Dropdown, Menu, Modal } from 'semantic-ui-react'
import MenuLink from 'components/MenuLink'
import LoginForm from 'components/LoginForm'

const TopMenu = ({ isLoggedIn, user }) =>
    <Menu inverted>
        <MenuLink to="/" onlyActiveOnIndex>
            Home
        </MenuLink>
        <MenuLink to="/features">Features</MenuLink>
        <Menu.Item>Card base</Menu.Item>
        <Dropdown item text="Helpers">
            <Dropdown.Menu>
                <Dropdown.Item>Матрица Simple</Dropdown.Item>
                <Dropdown.Item>Матрица Continuous</Dropdown.Item>
                <Dropdown.Item>Выделение слов</Dropdown.Item>
                <Dropdown.Item>Числа на слух</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
        {isLoggedIn
            ? <Menu.Menu position="right">
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
            : <Menu.Menu position="right">
                  <Modal size="small" closeIcon trigger={<a className="item">Log in</a>}>
                      <Modal.Header>Log in</Modal.Header>
                      <Modal.Content>
                          <LoginForm />
                      </Modal.Content>
                  </Modal>
              </Menu.Menu>}
    </Menu>

TopMenu.propTypes = {
    isLoggedIn: PropTypes.bool,
    user: PropTypes.object,
}

export default TopMenu
