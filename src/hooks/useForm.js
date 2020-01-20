import { useState, useEffect, useCallback } from "react";

import usePrevious from './usePrevious'


function useForm(fileds, validations = {}) {

    const [form, setForm] = useState({});
    const [saveDisabled, setSaveDisabled] = useState(true);

    const prevForm = usePrevious(form);
    
    // generate errors state array with every field (empty)
    let errorsSchema = {...fileds}
    Object.keys(errorsSchema).forEach(v => errorsSchema[v] = {invalid: false, message: ''})    
    const [errors, setErrors] = useState(errorsSchema)

    
    useEffect(() => {
        const doValidate = async() => await validateForm()                              
        doValidate();
        // eslint-disable-next-line react-hooks/exhaustive-deps 
    }, [form]);

    useEffect(() => {
        checkDisabled()
        // eslint-disable-next-line react-hooks/exhaustive-deps 
    }, [errors]);


    const validateForm = async() => {   
        // let tmpErrors = errors; 

        if(!form || Object.keys(form).length === 0){
            console.log('Empty form, wont validate')
            return false
        }

        Object.keys(validations).forEach(async (name) => {
            if (form[name] !== prevForm[name]) { // only validate the fields that changed
                const error = await validate(name, form[name]);
                console.log(error); // TODO s sjd ajkdj kad jkasd jsakl jdaskld jakl djakl djaks jlk
                
                setErrors(prevState => ({...prevState, [name]: {
                    invalid: (error !== ''),
                    message: error
                }}));

                // tmpErrors = {
                // ...tmpErrors,
                //     [name]: {
                //         invalid: (error !== ''),
                //         message: error
                //     }
                // };
            }
        })

        // setErrors(prevState => ({...prevState, ...tmpErrors}));
    }
    

    const checkDisabled = useCallback(() => {

        const isInvalid = Object.keys(validations).some(name => {
            return errors[name].invalid;
        });

        setSaveDisabled(isInvalid);

    }, [errors, validations]);


    const handleOnChange = useCallback(async(name,value) => {
    
        setForm(prevState => ({ ...prevState, [name]: value }));

        // eslint-disable-next-line react-hooks/exhaustive-deps   
    },[validations]);


    const validate = async (name, value) => {
        let error = ''

        console.log(`validating ${name} with value (${value})...`)
        
        if(validations[name]){

            const { rules, required } = validations[name];

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

                await rules.some(async rule => {
                    
                    // console.log(rule)
                    // console.log(value)

                    if (rule.regEx) {

                        if(!rule.regEx.test(value)){
                            error = rule.message;
                            return true
                        }
                        else{
                            return false
                        }
                        
                    } else if (rule.method) {

                        const result = await rule.method(value)

                        if(result.validated){

                            console.log('validated', result)
                            
                            if(!result.valid){                                                                
                                error = rule.message;
                                return true
                            }
                        }
                        else{                             
                            console.log(`Couldnt validate ([${name}] = ${value})`  )
                            console.log(result.message  )
                            error = `Couldnt validate ([${name}] = ${value})`
                            return true
                        }
                        
                    }
                    else{
                        return false 
                    }

                    
                
                })

            }
            

        }

        console.log('returning {', error , '}')

        return error;
    }


    return { setForm, form, errors, saveDisabled, handleOnChange};
}

export default useForm;