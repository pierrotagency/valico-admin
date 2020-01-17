import React, { useState }  from 'react';
import PropTypes from 'prop-types';


const Input = ({label, isInvalid, isValid, message, className, name, onChange, type, value, ...props}) => {

    const inputClass = className + " form-control" + ((isValid) ? " is-valid" : "") + ((isInvalid) ? " is-invalid" : "") 
    
    const [input, setInput] = useState(value)

    // const handleInputChange = (e) => setInput({
    //     ...input,
    //     [e.currentTarget.name]: e.currentTarget.value
    // })

    const handleInputChange = (e) => setInput(e.currentTarget.value)

    return (
        <div className="form-group position-relative">
            <label>{label}</label>
            <input 
                {...props} 
                key={name}
                name={name}                
                className={inputClass}                 
                onChange={handleInputChange}       
                value={input}         
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