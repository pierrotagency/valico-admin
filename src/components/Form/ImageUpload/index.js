import { EventEmitter } from "events";
import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { Progress, Row, Col } from 'reactstrap';

import Label from '../Label' 
import Image from '../Image' 
import { safeParseJSON } from '../../../helpers/utils'
import { imageUrl } from '../../../helpers/url'
import './index.scss'

const ImageUpload = ({label, name, value, className, isInvalid, isValid, message, url, method, onProgress, onChange, onError, onAbort, backendValidations=null, required, ...props}) => {

    const [ progress, setProgress ] = useState(-1)
    const [ hasError, setHasError ] = useState(false)
    const [ error, setError ] = useState(null)
    const [ filename, setFilename ] = useState('')
    const [ imagepath, setImagepath ] = useState('')

    const [ preview, setPreview ] = useState(null)

    const proxy = new EventEmitter();
    
    const inputRef = useRef(null)  

    const callOnProgress = (prog) => (typeof(onProgress) === 'function') ? onProgress(name, prog) : false
    const callOnChange = (data) => (typeof(onChange) === 'function') ? onChange(name, data) : false
    const callOnError = (e) => (typeof(onError) === 'function') ? onError(name, e) : false
    const callOnAbort = () => (typeof(onAbort) === 'function') ? onAbort(name) : false

    
    useEffect(() => {     

        setFilename(value.filename ? value.filename : '')

        setImagepath(value.value ? value.value : '')

    },[value]);


    const cancelUpload = () => {
        console.log('cancelUpload')

        proxy.emit("abort");

        // req.abort()

        setProgress(-1)        
        setHasError(false)

        setPreview(null)

    }

    const handleOpenDialog = () => {
        inputRef.current.click()   
    }

    const handleFileSelected = () => {

        setProgress(0)        
        setHasError(false)

        const file = inputRef.current.files[0]

        setPreview(URL.createObjectURL(file))

        setFilename(file.name)
        
        doUpload(file)

    }

    // TODO FIX reupload file doest nothing
    const doUpload = (file) => {

        const data = new FormData();
        const req = new XMLHttpRequest();

        data.append("fileobj", file);

        req.open(method, url);

        proxy.once("abort", () => {
            console.log('proxy abort')
            req.abort();
        });

        addRequestBinds(req)

        if(backendValidations){
            data.append("_validations", JSON.stringify(backendValidations));
            req.setRequestHeader("X-Validate", JSON.stringify(backendValidations));
            req.setRequestHeader("X-Storage", 'local');
        }

        req.send(data);
        
    }

    const addRequestBinds = (req) => {
            
        req.addEventListener("load", e => {
            console.log('load')

            proxy.removeAllListeners(["abort"]);
            
            if (req.status >= 200 && req.status <= 299) { // OK
            
                setProgress(100)        
                setHasError(false)

                const response = safeParseJSON(req.response)

                if(response.name){
                    setFilename(response.name)
                    
                    setPreview(null)

                    callOnChange(response);
                }
                else{
                    setProgress(-1)        
                    setHasError(true)
                    setError('Invalid upload service response')  
                    callOnError(e);
                }
                
            }
            else if(req.status === 422 || req.status === 400){ // Validation

                let response = safeParseJSON(req.response)

                // TODO should be ARRAY or not?                
                if(Array.isArray(response) && response.length > 0) response = response[0]
                
                setProgress(-1)        
                setHasError(true)
                setError(response.message)

                callOnError(e);

            }
            else { // Error
                
                setProgress(-1)        
                setHasError(true)

                callOnError(e);

            }
            
        }, false);

        req.addEventListener("error", e => {            
            console.log('error', e)

            setHasError(true)
            callOnError(e);

        }, false);

        req.upload.addEventListener("progress", e => {
            
            const prog = (e.total !== 0) ? parseInt((e.loaded / e.total) * 100, 10) : 0
            
            setProgress(prog)        
            callOnProgress(prog);

        }, false);


        req.addEventListener("abort", e => {
            console.log('req abort')

            setProgress(-1)   
            callOnAbort();

        }, false);

    }


    const inputClass = className + " form-control" + ((isValid || hasError) ? " is-valid" : "") + ((isInvalid || hasError) ? " is-invalid" : "") 

    return (
        <div className="ImageUpload form-group position-relative">
            <Label name={label} required={required} />          
            <Row>
                <Col sm="12">

                    <div className="input-wrapper">
                        <div className="input-place">
                            <input                                                 
                                type="text"                
                                defaultValue={filename}
                                className={inputClass} 
                                disabled={true}
                            />
                            {isValid && message !== '' && <div className="valid-tooltip">{message}</div>}
                            {isInvalid && message !== '' && <div className="invalid-tooltip">{message}</div>}
                            {hasError && <div className="invalid-tooltip">{error || "Failed to upload"}</div>}
                            {progress > -1 && progress <= 100 && !isInvalid && !isValid ? 
                                <Progress className="mt-2" style={{ height: '5px' }} color={progress===100?"success":"purple"} value={progress} />   
                                :
                                null
                            }
                        </div>

                        <div className="btn-wrapper">
                            <span className="split"></span>
                            {progress < 0 || progress === 100 ?  
                                <div aria-hidden="true" className="btn-open" onClick={handleOpenDialog} >                                    
                                    <svg className="btn-open-svg" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
                                </div>
                            :
                                <div aria-hidden="true" className="btn-cancel" onClick={cancelUpload} >                                    
                                    <svg className="btn-cancel-svg" height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false" className="css-6q0nyr-Svg"><path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"></path></svg>
                                </div>
                            }
                            
                        </div>
                    </div>

                </Col>                                             
            </Row>
            <Row>
                <Col sm="12">                    
                    <Image 
                        src={imagepath && imageUrl(imagepath,{width:200})} 
                        previewSrc={preview}
                        alt="preview" 
                        progress={progress}
                    />
                </Col>                
            </Row>
            
            <input 
                type="file" 
                name={name ? name : 'file'}
                ref={inputRef}
                onChange={handleFileSelected}
                style={{display:'none'}}
            />
        </div>
    )

}

ImageUpload.propTypes = {
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired, 
    value: PropTypes.object.isRequired,    
    onProgress: PropTypes.func,
    onChange: PropTypes.func,
    onError: PropTypes.func,
    onAbort: PropTypes.func,
    label: PropTypes.string,    
    isValid: PropTypes.bool,
    isInvalid: PropTypes.bool,
    message: PropTypes.string,
    className: PropTypes.string,    
};

export default ImageUpload;