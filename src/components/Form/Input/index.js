import React  from 'react';
import PropTypes from 'prop-types';


const Input = ({label, isInvalid, isValid, message, className, name, onChange, onBlur, value, ...props}) => {

    const inputClass = className + " form-control" + ((isValid) ? " is-valid" : "") + ((isInvalid) ? " is-invalid" : "") 

    const handleOnBlur = (t) => (typeof(onBlur) === 'function') ? onBlur(name) : false
    const handleOnChange = (v) => (typeof(onChange) === 'function') ? onChange(name,v) : false

    return (
        <div className="form-group position-relative">
            <label>{label}</label>
            <input 
                {...props} 
                key={name}
                name={name}      
                id={name}                
                className={inputClass} 
                type="text"
                onChange={(e) => handleOnChange(e.target.value)}
                onBlur={handleOnBlur}
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
    error: PropTypes.any,
    required: PropTypes.any,
    onChange: PropTypes.func,
    isValid: PropTypes.bool,
    isInvalid: PropTypes.bool,
    message: PropTypes.string,
    className: PropTypes.string,    
};

export default Input;