import React, { useState } from 'react'
import styled from 'styled-components'

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


export default function({ children: area, addModule }) {
  // const [title, setTitle] = useState(area.title)
  const [title] = useState(area.title)
  
  return (
    <AreaHandlerSkeleton>
        <>
          <AreaTitle>
            {title}
          </AreaTitle>                
        </>
    </AreaHandlerSkeleton>
  )
}
