import React from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { UserOutlined, LockOutlined, MailFilled, MailOutlined } from '@ant-design/icons';
import '../FormRegister'
const FormRegister = () => {
    const onFinish = (values) => {
        console.log('Success:', values);
    }
    const onFinishFailed = (errorInfo) => {
        console.log('Failed', errorInfo);
    }
    return (
        <>
            <Card
                title="Registro"
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
                        <Input prefix={<UserOutlined />} placeholder='Nombre de usuario' />
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

                    <Form.Item
                        name='mail'
                        rules={[
                            {
                                required: true,
                                message: 'Por favor ingrese su correo'
                            },
                            {
                                type: 'email',
                                message: 'El correo no es válido'
                            }
                        ]}
                    >
                        <Input prefix={<MailOutlined />} placeholder='Correo electrónico' />
                    </Form.Item>

                    <Form.Item>
                        <Button type='primary' htmlType='submit' className='login-form-button'>
                            Iniciar Sesión
                        </Button>
                    </Form.Item>
                    ¿Ya tienes cuenta? <a href='/login'>Inicia sesión</a>
                </Form>

            </Card>
        </>
    );
}

export default FormRegister;