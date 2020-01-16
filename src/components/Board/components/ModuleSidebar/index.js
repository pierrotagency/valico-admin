import React from 'react';
import { Row, Col, Button } from 'reactstrap';
import { Scrollbars } from 'react-custom-scrollbars';

import "./index.scss";


const ModuleSidebar = ({
    children,
    onCloseClick
}) => {

    const handleCloseClick = () => (typeof(onCloseClick) === 'function') ? onCloseClick() : false

    return (
        <>            
            <Row>
                <Col>
                    <Button color="danger" onClick={handleCloseClick} >
                        <i className="mdi mdi-backup-restore mr-2"></i>Close
                    </Button>
                </Col>
            </Row>            
            <Row>
                <Col>
                    <Scrollbars
                        className="scrollHeight"
                        // autoHeight autoHeightMin={100} autoHeightMax={200}
                    >
                        {children}            
                    </Scrollbars>
                </Col>
            </Row>        
        </>
    );

}

export default ModuleSidebar;