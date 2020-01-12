import React, { useState } from 'react'
import { Tooltip } from 'reactstrap';
import { Link } from 'react-router-dom';



export default function({ 
    onRemove,
    onEdit,
    onEnter,
    item,
    types
}) {
    const [state, setState] = useState({})

    const handleOnEdit = (e) => (typeof(onEdit) === 'function') ? onEdit(e, item) : false
    const handleOnRemove = (e) => (typeof(onRemove) === 'function') ? onRemove(e, item) : false
    const handleOnEnter = (e) => (typeof(onEnter) === 'function') ? onEnter(e, item) : false
    
    return (
        <tr>            
            <td>
                <Link to="#" onClick={handleOnEnter}>{item.name}</Link>
            </td>
            <td>{item.type?types[item.type].name:null}</td>
            <td>{item.is_published ? <span className="badge badge-soft-success badge-pill"><i className="mdi mdi-checkbox-blank-circle mr-1"></i> Published</span>:<span className="badge badge-soft-warning badge-pill"><i className="mdi mdi-checkbox-blank-circle mr-1"></i> Not Published</span>}</td>
            <td>            
                <div>
                    {typeof(onEdit) === 'function' ? (
                        <>
                        <Tooltip placement="top" isOpen={state.t1} target="t1" toggle={() => setState({ t1: !state.t1 })}>Edit</Tooltip>                
                        <Link to="#" id="t1" className="text-success mr-4" onClick={handleOnEdit}><i className="dripicons-pencil h5 m-0"></i></Link>
                        </>
                    ):null}
                    {typeof(onRemove) === 'function' ? (
                        <>
                            <Tooltip placement="top" isOpen={state.t2} target="t2" toggle={() => setState({ t2: !state.t2 })}>Delete</Tooltip>
                            <Link to="#" id="t2" className="text-danger" onClick={handleOnRemove}> <i className="dripicons-cross h5 m-0"></i></Link>
                        </>
                    ):null}
                </div>
            </td>
        </tr> 
    )
}
