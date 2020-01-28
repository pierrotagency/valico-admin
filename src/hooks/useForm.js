import { useState, useEffect, useCallback } from "react";

import usePrevious from './usePrevious'

import { validateField } from '../helpers/validation'


function useForm(fieldSchema, validationSchema = {}) {

    const [form, setForm] = useState({});
    const [saveDisabled, setSaveDisabled] = useState(true);

    const [dirty, setDirty] = useState(false);

    const prevForm = usePrevious(form);
    
    // generate errors state array with every field (empty)
    let errorsSchema = {...fieldSchema}
    Object.keys(errorsSchema).forEach(v => errorsSchema[v] = {
        invalid: false,
        message: '',
        origin: 'frontend'
    })    
    const [errors, setErrors] = useState(errorsSchema)

    
    useEffect(() => {
        const doValidate = async() => await validateForm()                              
        if(dirty) doValidate()
        // if(dirty) validateForm()  
        // eslint-disable-next-line react-hooks/exhaustive-deps 
    }, [form]);

    useEffect(() => {
        checkDisabled()
        // eslint-disable-next-line react-hooks/exhaustive-deps 
    }, [errors, dirty]);


    const validateForm = async (validateAllFields = false) => {   

        let validForm = true

        if(!form || Object.keys(form).length === 0) return true
        
        // TODO set all errrors at once in state
        await Object.keys(validationSchema).forEach(async (name) => {

            if (form[name] !== prevForm[name] || validateAllFields) { // only validate the fields that changed (except validateAllFields is true)
                const error = await validateField(name, form[name], validationSchema);                
                const valid = (typeof error === 'undefined' || error === '') ? true:false

                if(!valid) validForm = false;

                setErrors(prevState => ({...prevState, [name]: {
                    invalid: !valid,
                    message: error,
                    origin: 'frontend'
                }}));

            }
        })

        return validForm
    }
    

    const checkDisabled = useCallback(() => {

        if(!dirty){ // if nothing has been touched in the form, dont enable the save
            setSaveDisabled(true)
            return true
        }

        const isInvalid = Object.keys(validationSchema)
            .some(name => errors[name].invalid 
                    && errors[name].origin === 'frontend'
            )
        setSaveDisabled(isInvalid);

    }, [errors, validationSchema, dirty]);


    const handleOnChange = useCallback(async(name,value) => {

        setDirty(true)
    
        setForm(prevState => ({ ...prevState, [name]: value }));

        // eslint-disable-next-line react-hooks/exhaustive-deps   
    },[validationSchema]);


    const setBackendErrors = (backErrors) => {
        
        //clean previous remote validation results, and set the new ones

        let newErrors = { ...errors };

        Object.keys(errors).forEach(err => {            
            if(newErrors[err].origin === 'backend'){
                newErrors[err].invalid = false
                newErrors[err].message = ''
            }               
        })

        backErrors.forEach(err => {
        
            newErrors = {
                ...newErrors, 
                [err.field]: {
                    invalid: true,
                    message: err.message,
                    origin: 'backend'
                }
            }
            
        })

        setErrors(newErrors)

        // savingPostError.validations.map(err => setErrors(prevState => ({
        //     ...prevState, 
        //     [err.field]: {
        //         invalid: true,
        //         message: err.message,
        //         origin: 'backend'
        //     }
        // })))

        return newErrors
    }


    return { setForm, form, errors, saveDisabled, handleOnChange, setBackendErrors, dirty, setDirty, validateForm};
}

export default useForm;