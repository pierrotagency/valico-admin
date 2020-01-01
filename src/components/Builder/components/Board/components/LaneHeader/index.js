import React, { useState } from 'react'
import styled from 'styled-components'

const LaneHeaderSkeleton = styled.div`
  padding-bottom: 10px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;

  span:nth-child(2) {
    cursor: pointer;
  }
`


function LaneTitle({ allowRenameLane, onClick, children: title }) {
  return <span>{title}</span>
}


export default function({ children: lane, addModule }) {
  // const [title, setTitle] = useState(lane.title)
  const [title] = useState(lane.title)
  
  return (
    <LaneHeaderSkeleton>
        <>
          <LaneTitle>
            {title}
          </LaneTitle>                
        </>
    </LaneHeaderSkeleton>
  )
}
