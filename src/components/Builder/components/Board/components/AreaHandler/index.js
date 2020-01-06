import React, { useState } from 'react'
import styled from 'styled-components'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const AreaHandlerSkeleton = styled.div`
  padding-bottom: 10px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;

  span:nth-child(2) {
    cursor: pointer;
  }
`


function AreaTitle({ allowRenameArea, onClick, children: title }) {
  return <span>{title}</span>
}


export default function({ 
  children: area,
  library,
  moduleAdded
}) {
  
  const [title] = useState(area.title)
  
  const [state, setState] = useState({drp_main:false})


  const addClickHandler = (el) =>{
    
    moduleAdded(area, { component: el })

  }
  
  return (
    <AreaHandlerSkeleton>
        <>
          <AreaTitle>
            {title}
          </AreaTitle>   
          
          <Dropdown isOpen={state.drp_main} toggle={() => setState({ drp_main: !state.drp_main })}>
            <DropdownToggle className="btn btn-info mb-2 mb-sm-0" caret>
              Add{' '}
            </DropdownToggle>
            <DropdownMenu>

              {Object.keys(library).map(key => (  
                <DropdownItem key={key} onClick={() => addClickHandler(key)} >{key}</DropdownItem>                                  
              ))} 

              {/* <div className="dropdown-divider"></div>
              <DropdownItem>Custom module..</DropdownItem> */}
            </DropdownMenu>
          </Dropdown> 
          
        </>
    </AreaHandlerSkeleton>
  )
}
