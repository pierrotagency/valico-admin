import React  from 'react';
import PropTypes from 'prop-types';

import './index.scss'

const Label = ({name, required, ...props}) => {
    
    if(!name) return(<></>);

    return (
        <label>{name} {required?<sup alt="required">*</sup>:null}</label>
    )
}

Label.propTypes = {
    name: PropTypes.string,    
    required: PropTypes.bool    
};

export default Label;