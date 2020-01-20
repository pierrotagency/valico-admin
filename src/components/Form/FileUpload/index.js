import { EventEmitter } from "events";
import React, { useState, useRef } from "react";
import PropTypes from "prop-types";

import "./index.scss";


const FileUpload = ({url, method, onProgress, onLoad, onError, onAbort, ...props}) => {

    const [ progress, setProgress ] = useState(-1)
    const [ hasError, setHasError ] = useState(false)

    const proxy = new EventEmitter();

    const inputRef = useRef(null)  
    

    const cancelUpload = () => {
        console.log('cancelUpload')

        proxy.emit("abort");

        setProgress(-1)        
        setHasError(false)

    }

    const onSubmit = (e) => {
        console.log('onSubmit')

        e.preventDefault();

        setProgress(0)        
        setHasError(false)

        _doUpload()

    }



    // const _getFormData = () => {
    //     return new FormData(ReactDom.findDOMNode(this.refs.form));
    // }

    const _doUpload = () => {
        console.log('_doUpload')

        // const form = _getFormData();
        const req = new XMLHttpRequest();

        req.open(method, url);


        req.addEventListener("load", e => {

            proxy.removeAllListeners(["abort"]);
            
            if (req.status >= 200 && req.status <= 299) {
            
                setProgress(100)        
                setHasError(false)

                onLoad(e, req);

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

        const myFile = document.querySelector("input[type=file]").files[0];

        const data = new FormData();
            data.append("file", myFile);
            data.append("otherStuff", "stuff from a text input");

        req.send(data);
        
    }


    const progressRenderer = () => {
        console.log('progressRenderer')

        if (hasError || progress > -1) {
            const barStyle = {};
            barStyle.width = `${progress}%`;

            let message = <span>Uploading ...</span>;
            if (hasError) {
                barStyle.backgroundColor = "#d9534f";
                message = (
                    <span style={{ color: "#a94442" }}>Failed to upload ...</span>
                );
            } else if (progress === 100) {
                message = <span>Successfully uploaded</span>;
            }

            return (
                <div>
                    <div className="progressWrapper">
                        <div
                        className="progressBar"
                        style={barStyle}
                        />
                    </div>
                    <button
                        className="cancelButton"
                        onClick={cancelUpload}
                    >
                        <span>&times;</span>
                    </button>
                    <div style={{ clear: "left" }}>{message}</div>
                </div>
            );
        }

        return "";

    }

    const progessElement = progressRenderer();

    return (
        <div>
            <form   
                ref={inputRef}             
                method="post"
                onSubmit={onSubmit}
            >
                <div>
                    <input type="file" name="file"  />
                </div>
                <input type="submit" />
            </form>
            {progessElement}
        </div>
    )

}

FileUpload.propTypes = {
    url: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,    
    onProgress: PropTypes.func,
    onLoad: PropTypes.func,
    onError: PropTypes.func,
    onAbort: PropTypes.func
};

export default FileUpload;