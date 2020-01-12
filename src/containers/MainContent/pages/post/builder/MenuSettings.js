import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class MenuSettings extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {

        return (
            <React.Fragment>
                <Dropdown key="settings_menu" isOpen={this.state.setting_menu} toggle={() => this.setState({ setting_menu: !this.state.setting_menu })} style={{display:"inline-block"}}>
                    <DropdownToggle color="primary" className="arrow-none waves-effect waves-light">
                        <i className="mdi mdi-settings mr-2"></i> Settings
                    </DropdownToggle>
                    <DropdownMenu className="language-switch" right>
                        <DropdownItem tag="a" href="#">Lalalala</DropdownItem>                       
                        <DropdownItem tag="a" href="#">1231312312</DropdownItem>                       
                        <div className="dropdown-divider"></div>                        
                        <DropdownItem tag="a" href="#">Separated link</DropdownItem>
                    </DropdownMenu>
                </Dropdown>               
            </React.Fragment>
        );
    }
}

export default MenuSettings;