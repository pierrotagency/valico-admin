import React, { useEffect } from 'react';
import { useParams } from "react-router";
import { useDispatch } from "react-redux";

import { activateAuthLayout, getViewPost, getTags } from "../../../../../store/actions";

import Form from './Form';

function PostView() {

    const dispatch = useDispatch();
    
    let { id } = useParams();

    useEffect(() => {       
        dispatch(activateAuthLayout());        
        dispatch(getTags())        
    },[dispatch]);

    useEffect(() => {
        dispatch(getViewPost(id));	
    }, [dispatch, id]);


    return (      
        <Form     />            
    );
}

export default PostView