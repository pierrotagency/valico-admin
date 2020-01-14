import React, { useState } from 'react'
import { Tooltip } from 'reactstrap';
import { Link } from 'react-router-dom';

import './index.scss'

export default function Item({ 
    onRemoveClick,
    onEditClick,
    onBuildClick,
    onEnter,
    item,
    types
}) {
    const [state, setState] = useState({})

    const handleOnEdit = (e) => (typeof(onEditClick) === 'function') ? onEditClick(e, item) : false
    const handleOnBuild = (e) => (typeof(onBuildClick) === 'function') ? onBuildClick(e, item) : false
    const handleOnRemove = (e) => (typeof(onRemoveClick) === 'function') ? onRemoveClick(e, item) : false
    const handleOnEnter = (e) => (typeof(onEnter) === 'function') ? onEnter(e, item) : false
    
    return (
        <tr>            
            <td>
                <Link to="#" onClick={handleOnEnter}>{item.name}</Link>
            </td>
            <td>{item.type?types[item.type].name:null}</td>
            <td>{item.is_published ? <span className="badge badge-soft-success badge-pill"><i className="mdi mdi-checkbox-blank-circle mr-1"></i> Published</span>:<span className="badge badge-soft-warning badge-pill"><i className="mdi mdi-checkbox-blank-circle mr-1"></i> Not Published</span>}</td>
            <td>            
                <div className="actions">
                    {typeof(onEditClick) === 'function' ? (
                        <>
                        <Tooltip placement="top" isOpen={state.ttEdit} target="ttEdit" toggle={() => setState({ ttEdit: !state.ttEdit })}>Edit</Tooltip>                
                        <Link to="#" id="ttEdit" className="text-success mr-4" onClick={handleOnEdit}><i className="dripicons-pencil h5 m-0"></i></Link>
                        </>
                    ):null}
                    {typeof(onBuildClick) === 'function' ? (
                        <>
                        <Tooltip placement="top" isOpen={state.ttBuild} target="ttBuild" toggle={() => setState({ ttBuild: !state.ttBuild })}>Build</Tooltip>                
                        <Link to="#" id="ttBuild" className="text-success mr-4" onClick={handleOnBuild}><i className="dripicons-view-thumb h5 m-0"></i></Link>
                        </>
                    ):null}
                    {typeof(onRemoveClick) === 'function' ? (
                        <>
                            <Tooltip placement="top" isOpen={state.ttRemove} target="ttRemove" toggle={() => setState({ ttRemove: !state.ttRemove })}>Delete</Tooltip>
                            <Link to="#" id="ttRemove" className="text-danger" onClick={handleOnRemove}><i className="dripicons-cross h5 m-0"></i></Link>
                        </>
                    ):null}
                </div>
            </td>
        </tr> 
    )
}
