import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import { layouts } from 'valico-sanmartin'

class MenuSettings extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {

        return (
            <React.Fragment>
                {/* <Dropdown key="settings_menu" isOpen={this.state.setting_menu} toggle={() => this.setState({ setting_menu: !this.state.setting_menu })} style={{display:"inline-block"}}>
                    <DropdownToggle color="primary" className="arrow-none waves-effect waves-light">
                        <i className="mdi mdi-settings mr-2"></i> Settings
                    </DropdownToggle>
                    <DropdownMenu className="language-switch" right>
                        <DropdownItem tag="a" href="#">Lalalala</DropdownItem>                       
                        <DropdownItem tag="a" href="#">1231312312</DropdownItem>                       
                        <div className="dropdown-divider"></div>                        
                        <DropdownItem tag="a" href="#">Separated link</DropdownItem>
                    </DropdownMenu>
                </Dropdown> */}
                <Dropdown key="layout_menu" isOpen={this.state.layout_menu} toggle={() => this.setState({ layout_menu: !this.state.layout_menu })}>
                    <DropdownToggle color="primary" className="arrow-none waves-effect waves-light">
                        <i className="fa fa-columns mr-2"></i> Layout
                    </DropdownToggle>
                    <DropdownMenu className="language-switch" right>
                        {Object.keys(layouts).map((layout, i) => (                        
                            <DropdownItem onClick={() => this.props.onChangeLayout(layout)}>{layouts[layout].name}</DropdownItem>
                        ))}
                        <div className="dropdown-divider"></div>                        
                        <DropdownItem tag="a" href="#">Custom..</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </React.Fragment>
        );
    }
}

export default MenuSettings;


