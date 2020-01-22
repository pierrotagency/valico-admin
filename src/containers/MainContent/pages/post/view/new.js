import React, { useEffect } from 'react';
import { useDispatch } from "react-redux";

import { activateAuthLayout, getTags, createBlankPost} from "../../../../../store/actions";

import Form from './Form/';

import { fieldsSchema } from './Form/formSchema'

function PostNew() {

    const dispatch = useDispatch();
    
    useEffect(() => {       
        
        dispatch(activateAuthLayout())
        
        dispatch(getTags())   
        
        dispatch(createBlankPost(fieldsSchema))

    },[dispatch]);

  
    return (      
        <Form     />            
    );
}

export default PostNew