import React from 'react';
import { Row, Col, Button } from 'reactstrap';

import "./index.scss";


const ModuleSidebar = ({
    children,
    onCloseClick
}) => {


     const handleCloseClick = () => (typeof(onCloseClick) === 'function') ? onCloseClick() : false


    return (
        <>
            

        <Button color="danger" onClick={handleCloseClick} >
            <i className="mdi mdi-backup-restore mr-2"></i>Close
        </Button>
            
            <div className="px-4 pt-4">
            
                <div>
                    <h5 className="font-14">Clients</h5>

                    {children}            

                </div>

            </div>
        
        </>
    );

}


export default ModuleSidebar;