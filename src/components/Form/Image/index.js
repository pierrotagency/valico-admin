import React, {useState, useEffect}  from 'react';
import PropTypes from 'prop-types';

import './index.scss'

const Image = ({src, previewSrc, progress, alt, ...props}) => {
    
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {          
        if(src!=='') setLoading(true);    
    },[src]);

    const imageLoaded = () => setLoading(false)
    const imageError = () => setLoading(false)

    const source = previewSrc ? previewSrc : src;

    const styledProgress = (progress >= 0 ? progress : 100) + '%'


    return (
        <div className="Image">
            <div className="wrapper">                
                <div className="overlay" style={{width: styledProgress}}>
                    
                    {/* cant put conditional rendering because IMG DOM needs to be here in order to onLoad to work */}
                    
                    <div className="loading-wrapper" style={{display: loading ? "flex" : "none"}}>
                        <div className="loading">
                            <div className="spinner-border text-primary loading mr-2" role="status" >
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    </div>
                
                    <img 
                        {...props} 
                        src={source}
                        onLoad={imageLoaded}
                        onError={imageError}
                        alt={alt}
                        style={{display: loading ? "none" : "block"}}
                    />                   
                    
                </div>
                
                <img                     
                    src={source}                
                    alt=""     
                />
            
            </div>
        </div>
    )
}

Image.propTypes = {
    src: PropTypes.string.isRequired   
};

export default Image;