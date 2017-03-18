import React from 'react';
import { Dropdown, Menu } from 'semantic-ui-react';


const TopMenu = () => (
    <Menu inverted>
        <Menu.Item>Главная</Menu.Item>
        <Menu.Item>Возможности</Menu.Item>
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
            <Menu.Item>Логин</Menu.Item>
        </Menu.Menu>
    </Menu>
);

export default TopMenu;
