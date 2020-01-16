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

export default function AreaHandler({ 
  children: area,
  library,
  moduleAdded
}) {
  
  // const [title] = useState(area.title)
  
  const [toggle, setToggle] = useState(false)

  const addClickHandler = (el) => moduleAdded(area, { component: el })

  return (
    <AreaHandlerSkeleton>
      <Dropdown isOpen={toggle} toggle={() => setToggle(!toggle)}>
        <DropdownToggle className="btn btn-info btn-sm mb-2 mb-sm-0">
          <i className="mdi mdi-plus font-16"></i>
        </DropdownToggle>
        <DropdownMenu>
          {Object.keys(library).map(key => (  
            <DropdownItem key={key} onClick={() => addClickHandler(key)} >{key}</DropdownItem>                                  
          ))} 
        </DropdownMenu>
      </Dropdown> 
    </AreaHandlerSkeleton>
  )
}
