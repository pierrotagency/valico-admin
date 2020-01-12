import React, { useState } from 'react'
import { Progress, Tooltip } from 'reactstrap';
import { Link } from 'react-router-dom';


import user6 from '../../../../../../images/users/user-6.jpg';
import user7 from '../../../../../../images/users/user-7.jpg';
import user8 from '../../../../../../images/users/user-8.jpg';


export default function({ 
    onRemove,
    onEdit,
    item
}) {
    const [state, setState] = useState({})

    const handleOnEdit = () =>{        
        onEdit(item)
    }

    return (
        <tr>
            <th scope="row">1</th>
            <td>{item.name}</td>
            <td>22/4/2019</td>
            <td><span className="badge badge-soft-success badge-pill"><i className="mdi mdi-checkbox-blank-circle mr-1"></i> Completed</span></td>

            <td>
                <div className="team">
                    <Tooltip placement="top" isOpen={state.i1} target="i1" toggle={() => setState({ i1: !state.i1 })}>Roger Drake</Tooltip>
                    <Link to="#" id="i1" className="team-member"><img src={user6} alt="Valico" className="rounded-circle thumb-sm" /></Link>

                    <Tooltip placement="top" isOpen={state.i2} target="i2" toggle={() => setState({ i2: !state.i2 })}>Reggie James</Tooltip>
                    <Link to="#" id="i2" className="team-member"><img src={user7} alt="Valico" className="rounded-circle thumb-sm" /> </Link>

                    <Tooltip placement="top" isOpen={state.i3} target="i3" toggle={() => setState({ i3: !state.i3 })}>Reggie James</Tooltip>
                    <Link to="#" id="i3" className="team-member"><img src={user8} alt="Valico" className="rounded-circle thumb-sm" /></Link>
                </div>
            </td>
            <td>
                <p className="float-right mb-0 ml-3">80%</p>
                <Progress className="mt-2" style={{ height: '5px' }} color="success" value={80} />
            </td>
            <td>            
                <div>
                    <Tooltip placement="top" isOpen={state.t1} target="t1" toggle={() => setState({ t1: !state.t1 })}>Edit</Tooltip>                
                    <Link to="#" id="t1" className="text-success mr-4" onClick={handleOnEdit}><i className="dripicons-pencil h5 m-0"></i></Link>
                    
                    <Tooltip placement="top" isOpen={state.t2} target="t2" toggle={() => setState({ t2: !state.t2 })}>Delete</Tooltip>
                    <Link to="#" id="t2" className="text-danger" onClick={() => onRemove(item)}> <i className="dripicons-cross h5 m-0"></i></Link>
                </div>
            </td>
        </tr> 
    )
}
