import React from 'react'
import { Button } from 'reactstrap';


import './index.scss';

const ButtonWithLoading = ({ children, isLoading, className, iconClass, ...props }) => {

    return (
        <Button {...props} disabled={isLoading}>
            {isLoading ?
            (
            <div className="spinner-border text-primary loading mr-2" role="status" >
                <span className="sr-only">Loading...</span>
            </div>)
            :
            (
            <i className={iconClass + " mr-2"}></i>
            )}
            {children}
        </Button> 
    )

}

export default ButtonWithLoading