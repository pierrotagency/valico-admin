import React, { useState } from 'react'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button, ButtonGroup } from 'reactstrap';

import ButtonWithLoading from '../../../../../../components/ButtonWithLoading'

import { templates } from 'valico-sanmartin'


export default function ActionsMenu({     
    currentTemplate,
    onChangeTemplate,
    onClickSave,
    onClickUndo,
    onClickRedo,
    onClickClear,
    canRedo,
    canUndo,
    savingPost
}) {
    const [toggle, setToggle] = useState(false);
    const handleOnChangeTemplate = (t) => (typeof(onChangeTemplate) === 'function') ? onChangeTemplate(t) : false
    const handleTogggle = () => setToggle(!toggle)
    
    return (
        <>
            <div className="float-right d-none d-md-block">
                <div className="btn-toolbar " role="toolbar" aria-label="Toolbar">                    
                    <ButtonGroup className="mt-2 mt-xl-0 btn-sm">
                        <ButtonWithLoading color="success" isLoading={savingPost} iconClass="mdi mdi-content-save"
                            onClick={onClickSave}>
                            Save
                        </ButtonWithLoading>                       
                    </ButtonGroup>     
                    <Dropdown isOpen={toggle} toggle={handleTogggle} className="btn-sm">
                        <DropdownToggle color="primary" className="arrow-none waves-effect waves-light">
                            <i className="mdi mdi-monitor-dashboard mr-2"></i> {templates[currentTemplate].name}
                        </DropdownToggle>
                        <DropdownMenu className="language-switch" right>
                            {Object.keys(templates).map((template, i) => (                        
                                <DropdownItem key={i} onClick={() => handleOnChangeTemplate(template)}>{templates[template].name}</DropdownItem>
                            ))}                        
                        </DropdownMenu>
                    </Dropdown>                    
                    <ButtonGroup className="mt-2 mt-xl-0 btn-sm">
                        <Button color="secondary" onClick={onClickUndo} disabled={!canUndo}>
                            <i className="mdi mdi-undo mr-2"></i>Undo
                        </Button>
                        <Button color="secondary" onClick={onClickRedo} disabled={!canRedo}>
                            <i className="mdi mdi-redo mr-2"></i>Redo
                        </Button>
                    </ButtonGroup>     
                    <ButtonGroup className="mt-2 mt-xl-0 btn-sm">
                        <Button color="danger" onClick={onClickClear} >
                            <i className="mdi mdi-backup-restore mr-2"></i>Clear
                        </Button>
                    </ButtonGroup>     
                </div>                        
            </div>            
        </>
    )
}