import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import DrawerComponent from '../Drawer/index';  // Asegúrate de que la ruta es correcta
const { Header } = Layout;

import logo from '../../assets/kirby3.png';
import './Navbar.css';  // Importa el archivo CSS

const Navbar = () => {
    const [selectedKey, setSelectedKey] = useState('1');

    const handleLogoClick = () => {
        setSelectedKey('');
    };

    const tabNames = ["", "Productos", "Servicios", "Contactos"];

    const items = tabNames.map((name, index) => ({
        key: index + 1,
        label: name,
        url: index === 0 ? "/" : `/${name.toLowerCase()}`,
    }));

    return (
        <>
            <Header className='header-content' style={{ backgroundColor: '#001529' }}>
                <Link to="/" style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }} onClick={handleLogoClick}>
                    <img src={logo} alt="logo" style={{ width: '50px', height: 'auto' }} />
                </Link>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    selectedKeys={[selectedKey]}
                    style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        flex: 1,
                        minWidth: 0,
                        marginRight: '20px',
                        backgroundColor: '#001529',
                    }}
                >
                    {items.map(item => (
                        <Menu.Item key={item.key} onClick={() => setSelectedKey(item.key)}>
                            <Link to={item.url} className='menu-link'>{item.label}</Link>
                        </Menu.Item>
                    ))}
                </Menu>
                <DrawerComponent />
            </Header>
        </>
    );
};

export default Navbar;
