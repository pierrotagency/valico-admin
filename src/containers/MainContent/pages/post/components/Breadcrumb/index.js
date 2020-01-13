import React from 'react'
import { Link } from 'react-router-dom';

export default function({ 
    post,
    action,
    onClick
}) {
    const handleOnClick = (e, item) => (typeof(onClick) === 'function') ? onClick(e, item) : false
    
    return (
        <ol className="breadcrumb">
            <li key="home" className="breadcrumb-item"><Link to="#"><i className="mdi mdi-home-outline"></i></Link></li>        
            <li key="posts" className="breadcrumb-item"><Link to="/posts">Posts</Link></li>
            {post &&post.path.map((item, index) => {                
                return <li key={index} className="breadcrumb-item"><Link to="#" onClick={(e) => handleOnClick(e, item)}>{item.name}</Link></li>
            })}
            {post && <li key={post.id} className="breadcrumb-item">{post.name}</li>}                    
            {action && <li className="breadcrumb-item active">{action}</li>}
                
        </ol>
    )
}
