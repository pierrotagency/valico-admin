import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button, ButtonGroup } from 'reactstrap';

import { templates } from 'valico-sanmartin'

class MenuSettings extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {

        return (
            <React.Fragment>               
                
                <ButtonGroup className="mt-2 ">
                        
                    <Button className="btn btn-primary waves-effect waves-light" onClick={() => this.props.onClickSave()}>Save</Button>

                    <Dropdown key="template_menu" isOpen={this.state.template_menu} toggle={() => this.setState({ template_menu: !this.state.template_menu })}>
                        <DropdownToggle color="secondary" className="arrow-none waves-effect waves-light">
                            <i className="fa fa-columns mr-2"></i> {templates[this.props.currentTemplate].name}
                        </DropdownToggle>
                        <DropdownMenu className="language-switch" right>
                            {Object.keys(templates).map((template, i) => (                        
                                <DropdownItem key={template} onClick={() => this.props.onChangeTemplate(template)}>{templates[template].name}</DropdownItem>
                            ))}
                            {/* <div className="dropdown-divider"></div>                        
                            <DropdownItem tag="a" href="#">Custom..</DropdownItem> */}
                        </DropdownMenu>
                    </Dropdown>

                
                </ButtonGroup>
            </React.Fragment>
        );
    }
}

export default MenuSettings;


