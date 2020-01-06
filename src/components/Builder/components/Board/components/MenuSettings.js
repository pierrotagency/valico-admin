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
                <Dropdown key="layout_menu" isOpen={this.state.layout_menu} toggle={() => this.setState({ layout_menu: !this.state.layout_menu })}>
                    <DropdownToggle color="primary" className="arrow-none waves-effect waves-light">
                        <i className="fa fa-columns mr-2"></i> Layout
                    </DropdownToggle>
                    <DropdownMenu className="language-switch" right>
                        {Object.keys(layouts).map((layout, i) => (                        
                            <DropdownItem key={layout} onClick={() => this.props.onChangeLayout(layout)}>{layouts[layout].name}</DropdownItem>
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


