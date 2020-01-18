import React, { useState }  from 'react';
import CreatableSelect from 'react-select/creatable';

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


const createOption = (label) => ({
    label,
    value: label.toLowerCase().replace(/\W/g, ''),
});

const defaultOptions = [
    createOption('One'),
    createOption('Two'),
    createOption('Three'),
];

export default function Tags(name, onChange, props) {

    const [ state, setState ] = useState({
        isLoading: false,
        options: defaultOptions,
        value: undefined,
    });


    const handleChange = (newValue, actionMeta) => {
        
        console.log(newValue);
        console.log(`action: ${actionMeta.action}`);
        
        setState({...state, value: newValue });
    };
    
    const handleCreate = (inputValue) => {
        
        // setState({...state, isLoading: true });

        // setTimeout(() => {
            
            const newOption = createOption(inputValue);

            setState({
                ...state,
                isLoading: false,
                options: [...state.options, newOption],
                value: [...state.value, newOption],
            });
        // }, 1000);

    };

    // const handleOnChange = (e) => (typeof(onChange) === 'function') ? onChange(name,e) : false

    return (
        <CreatableSelect
            {...props}
            isMulti
            isClearable
            isDisabled={state.isLoading}
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
        />
    )
}