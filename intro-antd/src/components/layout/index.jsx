import React from 'react';
import { Col, Row } from 'antd';
import FormLogin from '../FormLogin';
import ImageLogin from '../ImageLogin';
import './Layout.css';


const LayoutComponent = () => {
    return (
        <div className="layout-container">
            <Row>
                <Col xs={0} sm={0} md={4} lg={6}>
                    <div className="content-left">
                        <ImageLogin />
                    </div>
                </Col>
                <Col xs={24} sm={24} md={20} lg={18}>
                    <div className="content-right">
                        <FormLogin />
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default LayoutComponent;

//slr = para crear un index = LayoutComponent
/* xs y sm es para el tamaño de pantallas 
Mis pantallas son de 24 puntos, por elloos debe sumar 24 cada xs, sm, md, lg*/