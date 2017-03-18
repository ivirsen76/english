import React from 'react';
import { Menu } from 'semantic-ui-react';

const SideMenu = () => (
    <Menu vertical fluid>
        <Menu.Item>
            <Menu.Header>Словарь</Menu.Header>

            <Menu.Menu>
                <Menu.Item name="Мои слова" />
            </Menu.Menu>
        </Menu.Item>

        <Menu.Item>
            <Menu.Header>Изучение</Menu.Header>

            <Menu.Menu>
                <Menu.Item name="Запоминание" />
                <Menu.Item name="Написание" />
                <Menu.Item name="Скачать MP3" />
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
