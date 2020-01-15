import React, { useState } from 'react'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from 'reactstrap';

import { templates } from 'valico-sanmartin'


export default function ActionsMenu({     
    currentTemplate,
    onChangeTemplate,
    onClickSave
}) {
    const [toggle, setToggle] = useState(false);
    const handleOnChangeTemplate = (t) => (typeof(onChangeTemplate) === 'function') ? onChangeTemplate(t) : false
    const handleTogggle = () => setToggle(!toggle)
    
    return (
        <>
            <div className="float-right d-none d-md-block">
                <Dropdown isOpen={toggle} toggle={handleTogggle}>
                    <DropdownToggle color="primary" className="arrow-none waves-effect waves-light">
                        <i className="mdi mdi-monitor-dashboard mr-2"></i> {templates[currentTemplate].name}
                    </DropdownToggle>
                    <DropdownMenu className="language-switch" right>
                        {Object.keys(templates).map((template, i) => (                        
                            <DropdownItem key={i} onClick={() => handleOnChangeTemplate(template)}>{templates[template].name}</DropdownItem>
                        ))}                        
                    </DropdownMenu>
                </Dropdown>
            </div>
            <div className="float-right d-none d-md-block mr-1">
                <Button color="success" className="arrow-none waves-effect waves-light" onClick={onClickSave}>
                    <i className="mdi mdi-plus mr-2"></i> Save
                </Button>                                    
            </div>            
        </>
    )
}
