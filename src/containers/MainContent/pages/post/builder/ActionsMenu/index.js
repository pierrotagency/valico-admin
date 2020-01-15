import React, { useState } from 'react'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from 'reactstrap';

import { templates } from 'valico-sanmartin'


export default function ActionsMenu({     
    // onClick,
    currentTemplate,
    onChangeTemplate
}) {
    const [toggle, setToggle] = useState(false);

    // const handleOnClick = (e, i, action) => (typeof(onClick) === 'function') ? onClick(e, i, action) : false

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
                            <DropdownItem key={template} onClick={() => handleOnChangeTemplate(template)}>{templates[template].name}</DropdownItem>
                        ))}
                        {/* <DropdownItem tag="a" href="#" onClick={(e) => handleOnClick(e, currentTemplate, 'edit')}>Edit</DropdownItem>
                        <DropdownItem tag="a" href="#" onClick={(e) => handleOnClick(e, currentTemplate, 'build')}>Build</DropdownItem>                    
                        <div className="dropdown-divider"></div>
                        <DropdownItem tag="a" href="#" onClick={(e) => handleOnClick(e, currentTemplate, 'remove')}>Remove</DropdownItem> */}
                    </DropdownMenu>
                </Dropdown>
            </div>
            <div className="float-right d-none d-md-block mr-1">
                <Button color="success" className="arrow-none waves-effect waves-light">
                    <i className="mdi mdi-plus mr-2"></i> Save
                </Button>                                    
            </div>            
        </>
    )
}
