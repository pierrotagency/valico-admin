import React from 'react'
import { Link } from 'react-router-dom';

export default function Breadcrumb({ 
    post,
    action
}) {
    
    const validPost = (post && post.slug)? true:false

    return (
        <ol className="breadcrumb" style={{"backgroundColor":"transparent"}}>
            <li key="home" className="breadcrumb-item"><Link to="/"><i className="mdi mdi-home-outline"></i></Link></li>        
            <li key="posts" className="breadcrumb-item"><Link to="/posts">Posts</Link></li>
            {(post && post.path) && post.path.reverse().map((item, index) => {                
                return <li key={index} className="breadcrumb-item"><Link to={"/posts/"+item.uuid}>{item.name}</Link></li>
            })}
            {post && <li key={post.id} className={action ? 'breadcrumb-item' : 'breadcrumb-item active'}>{validPost?post.name:'New'}</li>}                    
            {action && validPost && <li className="breadcrumb-item active">{action}</li>}
                
        </ol>
    )
}
