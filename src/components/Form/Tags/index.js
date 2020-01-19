import React, { useState, useEffect }  from 'react';
import CreatableSelect from 'react-select/creatable';

import './index.scss'

const customStyles = {
    control: base => ({
        ...base,
        border: 0,
        boxShadow: 'none'
    }),
    option: (provided, state) => ({
        ...provided,        
        color: state.isSelected ? '#ffffff' : '#adb5bd',
        // backgroundColor: '#3d4145'
    })
};

const createOption = (label, isNew=false) => ({
    label,
    value: label.toLowerCase().replace(/\W/g, ''),
    isNew: isNew
});

let defaultOptions = [
    // createOption('One'),
    // createOption('Two'),
    // createOption('Three'),
];

function mergeArrays(...arrays) {
    let jointArray = []

    arrays.forEach(array => {
        jointArray = [...jointArray, ...array]
    })
    const uniqueArray = jointArray.filter((item,index) => jointArray.indexOf(item) === index)
    return uniqueArray
}

export default function Tags({label, name, isInvalid, isValid, message, className, onChange, value, isDisabled, options, ...props}) {

    const inputClass = (className?className:'') + "tag form-control" + ((isValid) ? " is-valid" : "") + ((isInvalid) ? " is-invalid" : "") 

    const [ state, setState ] = useState({
        isLoading: false,
        options: defaultOptions,
        value: null,
    });

    useEffect(() => {
        setState({
            ...state,  
            value: value,          
            options: mergeArrays([...state.options, ...(options || []), ...(value || [])]),
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps   
    }, [options, value]);

    const handleChange = (newValue, actionMeta) => {
        setState({...state, value: newValue });
        if(typeof(onChange) === 'function') onChange(name, newValue) 
    };

    const handleCreate = (inputValue) => {        
        // setState({...state, isLoading: true });

        const newOption = createOption(inputValue,true);
        const newValue = [...(state.value || [])  , newOption];
        
        setState({
            ...state,
            isLoading: false,
            options: [...state.options, newOption],
            value: newValue,
        });
        if(typeof(onChange) === 'function') onChange(name, newValue) 

    };

    return (
        <div className="form-group position-relative">
            {label ? <label>{label}</label> : null}
            <CreatableSelect
                {...props}
                key={name}
                isMulti
                isClearable
                isDisabled={state.isLoading || isDisabled}
                isLoading={state.isLoading}
                onChange={handleChange}
                onCreateOption={handleCreate}
                options={state.options}
                value={state.value}
                styles={customStyles}            
                theme={(theme) => ({
                    ...theme,
                    colors: {
                    ...theme.colors,
                        neutral0: '#3d4145', // background general
                        neutral5: '#0f0',
                        neutral10: '#343a40', // selected tag
                        neutral20: '#adb5bd', // arrow and split in default mode
                        neutral30: '#f00',
                        primary25: '#4090cb', // list hover background
                        primary: '#6c757d', // list selected item background
                        neutral50: '#6c757d', // placeholder
                        neutral60: '#fff', // arrow on focus
                        neutral80: '#fff', // Cursor of input on focus and selected text
                        neutral90: '#f00' // 
                    },
                })}
                className={inputClass}
            />
            {isValid && message !== '' && <div className="valid-tooltip">{message}</div>}
            {isInvalid && message !== '' && <div className="invalid-tooltip">{message}</div>}
        </div>
    )
}