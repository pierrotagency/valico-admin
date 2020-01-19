import { useState, useEffect, useCallback } from "react";


function useForm(formSchema, validationSchema = {}) {

    const [form, setForm] = useState({});
    const [disable, setDisable] = useState(true);
    
    // generate errors state array with every field (empty)
    let errorsSchema = {...formSchema}
    Object.keys(errorsSchema).forEach(v => errorsSchema[v] = {invalid: false, message: ''})    
    const [errors, setErrors] = useState(errorsSchema)

    
    useEffect(() => {
        if(form && !(Object.keys(form).length === 0 && form.constructor === Object)){
            checkAllFields() 
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps 
    }, [form]);

    useEffect(() => {
        validateState()
    // eslint-disable-next-line react-hooks/exhaustive-deps 
    }, [errors]);


    const checkAllFields = () => {        
        let tmpErrors = errors; 

        Object.keys(validationSchema).forEach(name => {
            const error = getErrors(name)
            
            tmpErrors = {...tmpErrors, 
                [name]: {
                    invalid: (error !== ''), 
                    message: error 
                }
            }

        })

        setErrors(prevState => ({...prevState, ...tmpErrors}));
    }


    const validateState = useCallback(() => {

        const isInvalid = Object.keys(validationSchema).some(name => {
            return errors[name].invalid;
        });

        setDisable(isInvalid);

    }, [errors, validationSchema]);


    const handleOnChange = useCallback((name,value) => {
    
        setForm(prevState => ({ ...prevState, [name]: value }));

        const error = getErrors(name, value)
        setErrors(prevState => ({...prevState, 
            [name]: {
                invalid: (error !== ''), 
                message: error 
            }
        }));

        // eslint-disable-next-line react-hooks/exhaustive-deps   
    },[validationSchema]);


    const getErrors = (name,value=null) => {
        let error = '';

        if(!value && form) value = form[name];

        if(validationSchema[name]){

            if (validationSchema[name].required) {            
                if(Array.isArray(value) && value.length===0)
                    error = "This is required field.";                                        
                else if (!value)
                    error = "This is required field.";                
            }

            if (validationSchema[name].validator !== null && typeof validationSchema[name].validator === "object") {
                if (value && !validationSchema[name].validator.regEx.test(value)) {
                    error = validationSchema[name].validator.error;
                }
            }

        }

        return error;
    }


    return { setForm, form, errors, disable, handleOnChange };
}

export default useForm;