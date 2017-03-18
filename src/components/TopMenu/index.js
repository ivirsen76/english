import React from 'react';
import { Dropdown, Menu } from 'semantic-ui-react';
import MenuLink from 'components/MenuLink';


const TopMenu = () => (
    <Menu inverted>
        <MenuLink to="/" onlyActiveOnIndex>Главная</MenuLink>
        <MenuLink to="/features">Возможности</MenuLink>
        <Menu.Item>Базы слов</Menu.Item>
        <Dropdown item text="Помощники">
            <Dropdown.Menu>
                <Dropdown.Item>Матрица Simple</Dropdown.Item>
                <Dropdown.Item>Матрица Continuous</Dropdown.Item>
                <Dropdown.Item>Выделение слов</Dropdown.Item>
                <Dropdown.Item>Числа на слух</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
        <Menu.Menu position="right">
            <MenuLink to="/user">Dashboard</MenuLink>
            <Menu.Item>Логин</Menu.Item>
        </Menu.Menu>
    </Menu>
);

export default TopMenu;
