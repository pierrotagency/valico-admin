import React  from 'react';
// import PropTypes from 'prop-types';
import Toggle from 'react-toggle';

// const Toggle = ({label, name, checked, onChange, ...props}) => {
export default ({ label, name, checked, onChange, ...props }) => {

    const handleOnChange = (e) => (typeof(onChange) === 'function') ? onChange(name,e.target.checked) : false

    return (
        <label className="d-flex align-items-center mb-1">
            <Toggle key={name} checked={checked} aria-label={label} icons={false} onChange={handleOnChange} />
            {label ? <span className="ml-2">{label}</span> : null }
        </label>       
    )
}


// Toggle.propTypes = {
//     label: PropTypes.string,    
//     name: PropTypes.string,    
//     checked: PropTypes.bool    
// };

// export default Toggle;