import React from 'react';
import { Row, Col, Button } from 'reactstrap';
import { Scrollbars } from 'react-custom-scrollbars';
// import PerfectScrollbar from 'react-perfect-scrollbar';

import "./index.scss";


const ModuleSidebar = ({
    children,
    module,
    onCloseClick
}) => {

    const handleCloseClick = () => (typeof(onCloseClick) === 'function') ? onCloseClick() : false

    return (
        <>            
            <Row>
                <Col>
                    <h5 className="m-3">{module ? module.component : 'Module'}</h5>
                </Col>
                <Col>
                    <Button className="btn-rounded close-button m-2 float-right" color="secondary" onClick={handleCloseClick} >
                        <i className="mdi mdi-close" ></i>
                    </Button>
                </Col>                
            </Row>            
            <Row>
                <Col>
                    <Scrollbars className="scrollHeight">
                        {children}            
                    </Scrollbars>
                </Col>
            </Row>        
        </>
    );

}

export default ModuleSidebar;