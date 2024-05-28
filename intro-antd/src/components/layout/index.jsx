import React from 'react';
import { Col, Row } from 'antd';
import FormLogin from '../FormLogin';
import ImageLogin from '../ImageLogin';
import './Layout.css';


/* Pasar por propiedades los cambios 
Layout Component Reutilizable

*/
const LayoutComponent = ({ leftColSize, rightColSize, LeftContent, rightContent }) => {
    return (
        <div className="layout-container">
            <Row>
                <Col xs={leftColSize.xs} sm={leftColSize.sm} md={leftColSize.md} lg={leftColSize.lg}>
                    <div className="content-left">
                        {LeftContent}
                    </div>
                </Col>
                <Col xs={rightColSize.xs} sm={rightColSize.sm} md={rightColSize.md} lg={rightColSize.lg}>
                    <div className="content-right">
                        {rightContent}
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