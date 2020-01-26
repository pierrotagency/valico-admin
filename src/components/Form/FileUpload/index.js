import { EventEmitter } from "events";
import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { Progress, Button, Row, Col } from 'reactstrap';

import Label from '../Label' 
import { safeParseJSON } from '../../../helpers/utils'

const FileUpload = ({label, name, value, className, isInvalid, isValid, message, url, method, onProgress, onChange, onError, onAbort, backendValidations=null, required, ...props}) => {

    const [ progress, setProgress ] = useState(-1)
    const [ hasError, setHasError ] = useState(false)
    const [ error, setError ] = useState(null)
    const [ filename, setFilename ] = useState('')

    const proxy = new EventEmitter();
    
    const inputRef = useRef(null)  

    const callOnProgress = (prog) => (typeof(onProgress) === 'function') ? onProgress(name, prog) : false
    const callOnChange = (data) => (typeof(onChange) === 'function') ? onChange(name, data) : false
    const callOnError = (e) => (typeof(onError) === 'function') ? onError(name, e) : false
    const callOnAbort = () => (typeof(onAbort) === 'function') ? onAbort(name) : false

    
    useEffect(() => {       
        const name = value.filename ? value.filename : ''
        setFilename(name)
    },[value]);


    const cancelUpload = () => {
        console.log('cancelUpload')

        proxy.emit("abort");

        // req.abort()

        setProgress(-1)        
        setHasError(false)

    }

    const handleOpenDialog = () => {
        inputRef.current.click()   
    }

    const handleFileSelected = () => {

        setProgress(0)        
        setHasError(false)

        const file = inputRef.current.files[0]

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

                const response = safeParseJSON(req.response)

                // TODO should be ARRAY or not?                
                if(Array.isArray(response) && response.length > 0) response = response[0]
                
                setProgress(-1)        
                setHasError(true)
                setError(response.message)

                callOnError(e);

            }
            else { // Error
                
                setProgress(100)        
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
        <div className="form-group position-relative">
            <Label name={label} required={required} />          
            <Row>
                <Col sm="8">
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
                </Col>                
                <Col sm="4">                        
                    {progress > -1 && progress < 100 ?                                                                                                
                        <Button color="danger"
                            onClick={cancelUpload} >
                            <i className="mdi mdi-cancel mr-2"></i>Cancel
                        </Button>                                          
                    :
                        <Button color="secondary"
                            onClick={handleOpenDialog} >
                            <i className="mdi mdi-file-upload mr-2"></i>Select
                        </Button>  
                    }                        
                </Col>                
            </Row>
            <Row>
                <Col sm="12">
                    <img src="" />
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

FileUpload.propTypes = {
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,    
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

export default FileUpload;