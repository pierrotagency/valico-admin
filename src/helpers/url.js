const backendUrl = (str) => {        
    return `${process.env.REACT_APP_BACKEND_URL}/${str}`;    
}

const apiUrl = (str) => {        
    return `${process.env.REACT_APP_API_URL}/${str}`;    
}

const imageUrl = (str, params = {}, storage=null) => {

    if(!storage) storage = process.env.REACT_APP_DEFAULT_STORAGE
    
    let query = ''
    Object.keys(params).forEach((key) => {
        query +=  key + '=' + params[key] + '&'
    })
    if(query !== '') query = '?' + query.slice(0, -1); 

    return `${process.env.REACT_APP_BACKEND_URL}/storage/image/${storage}/${str}${query}`;    

}


export {
    backendUrl,
    apiUrl,
    imageUrl
}  