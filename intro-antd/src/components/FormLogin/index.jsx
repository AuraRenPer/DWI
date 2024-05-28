import React from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './FormLogin.css'
const FormLogin = () => {
    const onFinish = (values) => {
        console.log('Success:', values);
    }
    const onFinishFailed = (errorInfo) => {
        console.log('Failed', errorInfo);
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
                        <Button type='primary' htmlType='submit' className='login-form-button'>
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