import React, { useState } from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './FormLogin.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/auth';
import {useAuth} from '../../hooks/useAuth'

const FormLogin = () => {

    const useAuthData = useAuth();
    console.log(useAuthData);
    const navigate = useNavigate();

    //useState es menajeo de estado (error y carga)
    const [loginError, setLoginError] = useState(false);
    const [loading, setLoading] = useState(false);


    const onFinish = async (values) => {
        setLoading(true); //Establece el estado de carga a true al enviar el formulario
        setLoginError(false);
        //console.log('Success:', values);
        try {
            const response = await authService.loginForm(values.username, values.password);

            if (response && response.data) {
                localStorage.setItem('token', response.data.token);
                console.log(response.data.token)
                navigate('/'); //redirige al home
            } else {
                console.error('Error en el inicio de sesión: Respuesta inesperada');
                setLoginError(true);
            }
        } catch (error) {
            if (error.response) {
                console.error('Error en el inicio de sesión:', error.response.data);
            } else {
                console.error('Error en el inicio de sesión:', error.message);
            }
            setLoginError(true);
        } finally {
            setLoading(false); //Establece el estado de carga a false despues de recibir la respuesta
        }
    }
    const onFinishFailed = (errorInfo) => {
        console.log('Failed', errorInfo);
        setLoginError(true);
    }
    return (
        <>
            <Card
                title="Bienvenido de nuevo"
                bordered={false}
                className='responsive-card'
            >
                <Form
                    name='normal_login'
                    className='login-form'
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >

                    <Form.Item
                        name='username'
                        rules={[
                            {
                                required: true,
                                message: 'Por favor ingrese su usuario'
                            }
                        ]}
                    >
                        <Input prefix={<UserOutlined />} placeholder='Usuario' />
                    </Form.Item>

                    <Form.Item
                        name='password'
                        rules={[
                            {
                                required: true,
                                message: 'Por favor ingrese su contraseña'
                            }
                        ]}
                    >
                        <Input.Password prefix={<LockOutlined />} placeholder='Contraseña' />
                    </Form.Item>
                    <Form.Item>

                        {loginError && <p style={{ color: 'red' }}>Credenicales incorrecras. Intentalo de nuevo</p>}
                        <Button type='primary' htmlType='submit' className='login-form-button' loading={loading}>
                            Iniciar Sesión
                        </Button>
                    </Form.Item>
                    ¿Aún no tienes cuenta? <a href='/register'>Registrate</a>
                </Form>
            </Card>
        </>
    );
}

export default FormLogin;