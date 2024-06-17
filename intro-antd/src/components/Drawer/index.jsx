import React, { useState, useEffect, useContext } from 'react';
import { Drawer, Avatar, Form, Input, Button, List } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { AuthContext } from '../context/AuthContext';
import loginImage from '../../assets/perfil.png';

const DrawerComponent = () => {
    const { user, updateUserData } = useContext(AuthContext);
    const [open, setOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
    });

    useEffect(() => {
        if (user) {
            setFormData({
                username: user.username,
                email: user.email,
            });
        }
    }, [user]);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async () => {
        try {
            await updateUserData(formData);
            setEditMode(false);
            onClose();
        } catch (error) {
            console.error('Error al actualizar los datos del usuario:', error);
        }
    };

    const toggleEditMode = () => {
        setEditMode(!editMode);
    };

    return (
        <>
            <Avatar
                onClick={showDrawer}
                size={44}
                style={{ backgroundColor: '#87d68', cursor: 'pointer' }}
                icon={<UserOutlined />}
            />
            <Drawer title="Perfil de Usuario" onClose={onClose} visible={open}>
                {user ? (
                    <div style={{ padding: '20px' }}>
                        <center>
                            <img src={loginImage} alt="perfil" style={{ width: '150px', height: 'auto', marginBottom: '10px' }} />
                        </center>
                        <Form layout="vertical">
                            <Form.Item label="Nombre">
                                <Input
                                    name="username"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    disabled={!editMode}
                                />
                            </Form.Item>
                            <Form.Item label="Email">
                                <Input
                                    name="email"
                                    
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    disabled={!editMode}
                                />
                            </Form.Item>
                            <Form.Item>
                                {editMode ? (
                                    <>
                                        <Button type="primary" onClick={handleSubmit}>
                                            Guardar
                                        </Button>
                                        <Button onClick={() => setEditMode(false)} style={{ marginLeft: '10px' }}>
                                            Cancelar
                                        </Button>
                                    </>
                                ) : (
                                    <Button type="primary" onClick={toggleEditMode}>
                                        Editar
                                    </Button>
                                )}
                            </Form.Item>
                        </Form>
                        <List
                            style={{ marginTop: '20px' }}
                            bordered
                            dataSource={['Modificar contraseña']}
                            renderItem={(item) => (
                                <List.Item>
                                    <a href='/register'>{item}</a>
                                </List.Item>
                            )}
                        />
                    </div>
                ) : (
                    <p>Error</p>
                )}
            </Drawer>
        </>
    );
};

export default DrawerComponent;
