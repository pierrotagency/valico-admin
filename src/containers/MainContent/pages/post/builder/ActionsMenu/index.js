import React, { useState } from 'react'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export default function ActionsMenu({ 
    item,
    onClick
}) {
    const [toggle, setToggle] = useState(false);

    const handleOnClick = (e, i, action) => (typeof(onClick) === 'function') ? onClick(e, i, action) : false

    const handleTogggle = () => setToggle(!toggle)
    
    return (
        <>
            <Dropdown isOpen={toggle} toggle={handleTogggle}>
                <DropdownToggle color="primary" className="arrow-none waves-effect waves-light">
                    <i className="mdi mdi-settings mr-2"></i> ActionsB
                </DropdownToggle>
                <DropdownMenu className="language-switch" right>
                    <DropdownItem tag="a" href="#" onClick={(e) => handleOnClick(e, item, 'edit')}>Edit</DropdownItem>
                    <DropdownItem tag="a" href="#" onClick={(e) => handleOnClick(e, item, 'build')}>Build</DropdownItem>                    
                    <div className="dropdown-divider"></div>
                    <DropdownItem tag="a" href="#" onClick={(e) => handleOnClick(e, item, 'remove')}>Remove</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </>
    )
}
