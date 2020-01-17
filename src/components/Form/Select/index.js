import React  from 'react';
import Select from 'react-select';

const customStyles = {
    control: base => ({
        ...base,
        border: 0,
        boxShadow: 'none'
    })
};

// export default function SuperSelect(props) {
export default ({name, onChange, ...props}) => {


    const handleOnChange = (e) => (typeof(onChange) === 'function') ? onChange(name,e) : false

    return (
        <Select 
            {...props}
            styles={customStyles}            
            theme={(theme) => ({
                ...theme,
                colors: {
                ...theme.colors,
                    neutral0: '#3d4145',
                    neutral5: '#0f0',
                    neutral10: '#00f',
                    neutral20: '#adb5bd',
                    neutral30: '#42464b',
                    primary25: '#4090cb',
                    primary: '#adb5bd',
                    neutral50: '#6c757d', // placeholder
                    neutral60: '#fff', // arrow on focus
                    neutral80: '#fff', // Cursor of input on focus and selected text
                    neutral90: '#f00' // 
                },
                })}
            onChange={handleOnChange}
        />
    )
}