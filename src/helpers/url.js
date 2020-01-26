const backendUrl = (str) => {        
    return `${process.env.REACT_APP_BACKEND_URL}/${str}`;    
}

const apiUrl = (str) => {        
    return `${process.env.REACT_APP_API_URL}/${str}`;    
}

const imageUrl = (str, storage=null) => {
    if(!storage) storage = process.env.REACT_APP_DEFAULT_STORAGE
    return `${process.env.REACT_APP_BACKEND_URL}/storage/image/${storage}/${str}`;    
}


export {
    backendUrl,
    apiUrl,
    imageUrl
}  