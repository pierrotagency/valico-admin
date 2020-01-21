import { EventEmitter } from "events";
import React, { useState, useRef } from "react";
import PropTypes from "prop-types";

import { Progress, Button, Row, Col } from 'reactstrap';

import "./index.scss";


const FileUpload = ({label, name, className, isInvalid, isValid, message, url, method, onProgress, onChange, onError, onAbort, ...props}) => {

    const [ progress, setProgress ] = useState(-1)
    const [ uploadError, setHasError ] = useState(false)

    const proxy = new EventEmitter();

    const inputRef = useRef(null)  
    

    const cancelUpload = () => {
        console.log('cancelUpload')

        proxy.emit("abort");

        setProgress(-1)        
        setHasError(false)

    }

    const doUpload = () => {
        
        const req = new XMLHttpRequest();

        req.open(method, url);


        req.addEventListener("load", e => {

            proxy.removeAllListeners(["abort"]);
            
            if (req.status >= 200 && req.status <= 299) {
            
                setProgress(100)        
                setHasError(false)

                onChange(e, req);

            }
            else {
                            
                setProgress(100)        
                setHasError(true)

                onError(e, req);

            }
            
        }, false);


        req.addEventListener("error", e => {
            
            setHasError(true)

            onError(e, req);

        }, false);


        req.upload.addEventListener("progress", e => {
            
            let prog = 0;
            
            if (e.total !== 0) {
                prog = parseInt((e.loaded / e.total) * 100, 10);
            }
            
            setProgress(prog)        
            
            onProgress(e, req, prog);

        }, false);


        req.addEventListener("abort", e => {

            setProgress(-1)   

            onAbort(e, req);
            
        }, false);


        proxy.once("abort", () => {
            req.abort();
        });

        const data = new FormData();

            data.append("file", inputRef.current.files[0]);
            data.append("otherStuff", "stuff from a text input");

        req.send(data);
        
    }

    const handleFileSelected = () => {

        setProgress(0)        
        setHasError(false)

        doUpload()

    }


    const handleOpenDialog = () => {
        inputRef.current.click()   
    }


    const inputClass = className + " form-control" + ((isValid || uploadError) ? " is-valid" : "") + ((isInvalid || uploadError) ? " is-invalid" : "") 


    return (
        <>
            <div className="form-group position-relative">
                {label ? <label>{label}</label> : null}           
                
                <Row>
                    <Col sm="8">
                        <input                                                 
                            type="text"                
                            defaultValue="some-file-name.pdf"
                            className={inputClass} 
                            disabled={true}
                        />
                        {isValid && message !== '' && <div className="valid-tooltip">{message}</div>}
                        {isInvalid && message !== '' && <div className="invalid-tooltip">{message || "Failed to upload"}</div>}
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
                

            </div>
            
            <input 
                type="file" 
                name={name ? name : 'file'}
                ref={inputRef}
                onChange={handleFileSelected}
                style={{display:'none'}}
            />
            
            

        </>
    )

}

FileUpload.propTypes = {
    url: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,    
    onProgress: PropTypes.func,
    onChange: PropTypes.func,
    onError: PropTypes.func,
    onAbort: PropTypes.func,
    label: PropTypes.string,
    name: PropTypes.string,
    isValid: PropTypes.bool,
    isInvalid: PropTypes.bool,
    message: PropTypes.string,
    className: PropTypes.string,    
};


export default FileUpload;