import React, { useState } from 'react'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export default function ActionsMenu({ 
    post,
    onClick
}) {
    const [toggle, setToggle] = useState(false);

    const handleOnClick = (e, item, action) => (typeof(onClick) === 'function') ? onClick(e, item, action) : false

    const handleTogggle = () => setToggle(!toggle)
    
    return (
        <>
            <Dropdown isOpen={toggle} toggle={handleTogggle}>
                <DropdownToggle color="primary" className="arrow-none waves-effect waves-light">
                    <i className="mdi mdi-settings mr-2"></i> Actions
                </DropdownToggle>
                <DropdownMenu className="language-switch" right>
                    <DropdownItem tag="a" href="#" onClick={(e) => handleOnClick(e, post, 'edit')}>Edit</DropdownItem>
                    <DropdownItem tag="a" href="#" onClick={(e) => handleOnClick(e, post, 'build')}>Build</DropdownItem>                    
                    <div className="dropdown-divider"></div>
                    <DropdownItem tag="a" href="#" onClick={(e) => handleOnClick(e, post, 'remove')}>Remove</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </>
    )
}
