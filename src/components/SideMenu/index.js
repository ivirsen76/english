import React from 'react';
import { Menu } from 'semantic-ui-react';
import MenuLink from './MenuLink';


const SideMenu = () => (
    <Menu vertical fluid size="large">
        <Menu.Item>
            <Menu.Header>Словарь</Menu.Header>

            <Menu.Menu>
                <MenuLink to="/user/words">Мои слова</MenuLink>
            </Menu.Menu>
        </Menu.Item>

        <Menu.Item>
            <Menu.Header>Изучение</Menu.Header>

            <Menu.Menu>
                <MenuLink to="/user/remember">
                    Запоминание
                    <div className="ui label">12</div>
                </MenuLink>
                <MenuLink to="/write">
                    Написание
                    <div className="ui label">7</div>
                </MenuLink>
                <MenuLink to="/mp3">
                    Скачать MP3
                </MenuLink>
            </Menu.Menu>
        </Menu.Item>

        <Menu.Item>
            <Menu.Header>Справочно</Menu.Header>

            <Menu.Menu>
                <Menu.Item name="Статистика" />
            </Menu.Menu>
        </Menu.Item>

        <Menu.Item>
            <Menu.Header>Настройки</Menu.Header>

            <Menu.Menu>
                <Menu.Item name="Задачи" />
                <Menu.Item name="База слов" />
            </Menu.Menu>
        </Menu.Item>
    </Menu>
);

export default SideMenu;
