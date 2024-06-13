import React, { useState } from 'react';
import { Drawer, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const DrawerComponent = () => {
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    return (
        <>
            <Avatar
                onClick={showDrawer}
                size={44}
                style={{ backgroundColor: '#87d68', cursor: 'pointer' }}
                icon={<UserOutlined />}
            />
            <Drawer title="Basic Drawer" onClose={onClose} open={open}>
                <p>AHHHH...1</p>
                <p>AHHHH...2</p>
                <p>AHHHH...3</p>
            </Drawer>
        </>
    )
};

export default DrawerComponent;