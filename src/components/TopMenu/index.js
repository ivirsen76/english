import React from 'react';
import { Dropdown, Menu } from 'semantic-ui-react';


const TopMenu = () => (
    <Menu inverted>
        <Menu.Item>Home</Menu.Item>
        <Dropdown item text="Shopping">
            <Dropdown.Menu>
                <Dropdown.Item>Home Goods</Dropdown.Item>
                <Dropdown.Item>Bedroom</Dropdown.Item>
                <Dropdown.Item>Status</Dropdown.Item>
                <Dropdown.Item>Cancellations</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
        <Menu.Item>Forums</Menu.Item>
        <Menu.Item>Contact Us</Menu.Item>
    </Menu>
);

export default TopMenu;
