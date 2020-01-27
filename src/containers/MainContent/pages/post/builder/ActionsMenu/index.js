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
    // onClickView,
    canRedo,
    canUndo,
    canClear,
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
                        <ButtonWithLoading color="primary" isLoading={savingPost} iconClass="mdi mdi-content-save"
                            onClick={onClickSave}>
                            Save
                        </ButtonWithLoading>                       
                    </ButtonGroup>
                    {templates[currentTemplate] &&
                    <Dropdown isOpen={toggle} toggle={handleTogggle} className="btn-sm">
                        <DropdownToggle color="secondary" className="arrow-none">
                            <i className="mdi mdi-monitor-dashboard mr-2"></i> {templates[currentTemplate].name}
                        </DropdownToggle>
                        <DropdownMenu className="language-switch" right>
                            {Object.keys(templates).map((template, i) => (                        
                                <DropdownItem key={i} onClick={() => handleOnChangeTemplate(template)}>{templates[template].name}</DropdownItem>
                            ))}                        
                        </DropdownMenu>
                    </Dropdown>
                    } 
                    <ButtonGroup className="mt-2 mt-xl-0 btn-sm">
                        <Button color="danger" onClick={onClickClear} disabled={!canClear}>
                            <i className="mdi mdi-backup-restore"></i>
                        </Button>
                        <Button color="secondary" onClick={onClickUndo} disabled={!canUndo}>
                            <i className="mdi mdi-undo"></i>
                        </Button>
                        <Button color="secondary" onClick={onClickRedo} disabled={!canRedo}>
                            <i className="mdi mdi-redo"></i>
                        </Button>                    
                        
                    </ButtonGroup>     
                    {/* <ButtonGroup className="mt-2 mt-xl-0 btn-sm">
                        <Button color="default" onClick={onClickView} >
                            <i className="mdi mdi-config mr-2"></i>Properties
                        </Button>
                    </ButtonGroup> */}
                </div>                        
            </div>            
        </>
    )
}