import React  from 'react';
import PropTypes from 'prop-types';

import Label from '../Label' 

const Input = ({label, isInvalid, isValid, message, className, name, onChange, onBlur, value, required, ...props}) => {

    const inputClass = className + " form-control" + ((isValid) ? " is-valid" : "") + ((isInvalid) ? " is-invalid" : "") 

    const handleOnBlur = (v) => (typeof(onBlur) === 'function') ? onBlur(name,v) : false
    const handleOnChange = (v) => (typeof(onChange) === 'function') ? onChange(name,v) : false

    return (
        <div className="form-group position-relative">
            <Label name={label} required={required} />
            <input 
                {...props} 
                key={name}
                name={name}      
                id={name}                
                className={inputClass} 
                type="text"
                onChange={(e) => handleOnChange(e.target.value)}
                onBlur={(e) => handleOnBlur(e.target.value)}
                value={value}
            />
            {isValid && message !== '' && <div className="valid-tooltip">{message}</div>}
            {isInvalid && message !== '' && <div className="invalid-tooltip">{message}</div>}
        </div>
    )
}


Input.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    required: PropTypes.any,
    onChange: PropTypes.func,
    isValid: PropTypes.bool,
    isInvalid: PropTypes.bool,
    message: PropTypes.string,
    className: PropTypes.string,    
};

export default Input;