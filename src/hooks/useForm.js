import { useState, useEffect, useCallback } from "react";

import usePrevious from './usePrevious'


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
                const error = await validate(name, form[name]);                
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


    const checkRules = (name, rules, value) => {
        return Promise.all(
            
            rules.map(async rule => {

                if (rule.type === 'regex') {

                    if(!rule.regex.test(value)){
                        return rule.message;                            
                    }
                    else{
                        return ''
                    }
                    
                }
                else if (rule.type === 'function') {
                    
                    const result = await rule.method({
                        value: value,
                        name: name,
                        form: (form ? form : null)                        
                    })

                    if(result.validated){
                        if(!result.valid){                                                                                            
                            return rule.message;
                        }
                        else{
                            return ''
                        }
                    }
                    else{                                                                             
                        return `Couldnt validate ${name} with value ${value})`
                    }
                    
                }

                // rule.type === 'backend' is handled in the backend when the request is made
                
            })

        )
    }


    const validate = async(name, value) => {
        // console.log(`validating ${name} with value (${value})...`)
        
        if(!validationSchema[name]) return ''

        const { rules, required } = validationSchema[name];

        if (required) {            
            if(Array.isArray(value) && value.length===0)
                return "This is required field.";                                        
            else if (!value)
                return "This is required field.";                
        }
        else{
            if(value==='') return ''
        }

        if (rules && Array.isArray(rules)){
            const hasError = await checkRules(name, rules, value)
            var errors = hasError.filter(el => el !== null && el !== '')
            
            return errors[0] || ''
        }

        return ''
    }

    const parseBackendValidations = (fields=[],forSubmit=false) => {
        
        let res = {
            objects: {},
            messages: {}
        }

        fields.forEach(field => {

            if(validationSchema[field] && validationSchema[field].rules){
                validationSchema[field].rules
                    .filter(el => el.type === 'backend' && (el.onSubmit || !forSubmit))
                    .forEach(el => {
                        res.objects = {...res.objects, ...(el.object?el.object:{})}
                        res.messages = {...res.messages, ...(el.messages?el.messages:{})}
                    })
            }

        })
        
        return res
    }


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


    return { setForm, form, errors, saveDisabled, handleOnChange, parseBackendValidations, setBackendErrors, dirty, setDirty, validateForm};
}

export default useForm;