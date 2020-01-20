"use strict";

import { EventEmitter } from "events";
import React from "react";
import PropTypes from "prop-types";
import ReactDom from "react-dom";
// import objectAssign from 'object-assign';

import "./index.scss";

class FileUpload extends React.Component {

    constructor(props) {
        super(props);

        this.proxy = new EventEmitter();

        this.state = {
            progress: -1,
            hasError: false
        };
    }

    cancelUpload() {
        this.proxy.emit("abort");

        this.setState({
            progress: -1,
            hasError: false
        });
    }

    onSubmit(e) {
        e.preventDefault();

        this.setState({
            progress: 0,
            hasError: false
        },
            this._doUpload
        );
    }

    render() {
        
        const formElement = this.props.formRenderer(this.onSubmit.bind(this));
        const progessElement = this.props.progressRenderer(
            this.state.progress,
            this.state.hasError,
            this.cancelUpload.bind(this)
        );

        return (
            <div>
                {formElement}
                {progessElement}
            </div>
        );
    }

    _getFormData() {
        if (this.props.formGetter) {
            return this.props.formGetter();
        }
        return new FormData(ReactDom.findDOMNode(this.refs.form));
    }

    _doUpload() {

        const form = this._getFormData();
        const req = new XMLHttpRequest();

        req.open(this.props.method, this.props.url);


        req.addEventListener("load", e => {

            this.proxy.removeAllListeners(["abort"]);
            const newState = { progress: 100 };

            if (req.status >= 200 && req.status <= 299) {
            
                this.setState(newState, () => {
                    this.props.onLoad(e, req);
                });

            }
            else {
                newState.hasError = true;
            
                this.setState(newState, () => {
                    this.props.onError(e, req);
                });

            }
            
        }, false);


        req.addEventListener("error", e => {
            
            this.setState({hasError: true}, () => {
                this.props.onError(e, req);
            });

        }, false);


        req.upload.addEventListener("progress", e => {
            
            let progress = 0;
            
            if (e.total !== 0) {
                progress = parseInt((e.loaded / e.total) * 100, 10);
            }
            
            this.setState({progress}, () => {
                this.props.onProgress(e, req, progress);
            });

        }, false);


        req.addEventListener("abort", e => {

            this.setState({progress: -1}, () => {
                this.props.onAbort(e, req);
            });

        }, false);


        this.proxy.once("abort", () => {
            req.abort();
        });

        this.props.beforeSend(req).send(this.props.formCustomizer(form));
    }
}

FileUpload.propTypes = {
    url: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
    formGetter: PropTypes.func,
    formRenderer: PropTypes.func,
    progressRenderer: PropTypes.func,
    formCustomizer: PropTypes.func,
    beforeSend: PropTypes.func,
    onProgress: PropTypes.func,
    onLoad: PropTypes.func,
    onError: PropTypes.func,
    onAbort: PropTypes.func
};

FileUpload.defaultProps = {

    formRenderer: onSubmit => (
        <form
            ref="form"
            method="post"
            onSubmit={onSubmit}
        >
            <div>
                <input type="file" name="file" />
            </div>
            <input type="submit" />
        </form>
    ),

    progressRenderer: (progress, hasError, cancelHandler) => {

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
                        onClick={cancelHandler}
                    >
                        <span>&times;</span>
                    </button>
                    <div style={{ clear: "left" }}>{message}</div>
                </div>
            );
        }

        return "";

    },

    formCustomizer: form => form,
    beforeSend: request => request,
    onProgress: (e, request, progress) => {},
    onLoad: (e, request) => {},
    onError: (e, request) => {},
    onAbort: (e, request) => {}
};

export default FileUpload;