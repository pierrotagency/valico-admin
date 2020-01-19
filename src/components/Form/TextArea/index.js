import React  from 'react';
import PropTypes from 'prop-types';


const TextArea = ({label, isInvalid, isValid, message, className, name, onChange, onBlur, value, ...props}) => {

    const inputClass = className + " form-control" + ((isValid) ? " is-valid" : "") + ((isInvalid) ? " is-invalid" : "") 

    const handleOnBlur = (v) => (typeof(onBlur) === 'function') ? onBlur(name,v) : false
    const handleOnChange = (v) => (typeof(onChange) === 'function') ? onChange(name,v) : false

    return (
        <div className="form-group position-relative">
            {label ? <label>{label}</label> : null}         
            <textarea 
                {...props} 
                key={name}
                name={name}      
                id={name}                
                className={inputClass}
                onChange={(e) => handleOnChange(e.target.value)}
                onBlur={(e) => handleOnBlur(e.target.value)}
                value={value}                              
            ></textarea>
            {isValid && message !== '' && <div className="valid-tooltip">{message}</div>}
            {isInvalid && message !== '' && <div className="invalid-tooltip">{message}</div>}
        </div>
    )
}


TextArea.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    error: PropTypes.any,
    required: PropTypes.any,
    onChange: PropTypes.func,
    isValid: PropTypes.bool,
    isInvalid: PropTypes.bool,
    message: PropTypes.string,
    className: PropTypes.string,    
};

export default TextArea;