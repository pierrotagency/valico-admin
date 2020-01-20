import { useState, useEffect, useCallback, useRef } from "react";


function useForm(fileds, validations = {}) {

    const [form, setForm] = useState({});
    const [saveDisabled, setSaveDisabled] = useState(true);
    
    // generate errors state array with every field (empty)
    let errorsSchema = {...fileds}
    Object.keys(errorsSchema).forEach(v => errorsSchema[v] = {invalid: false, message: ''})    
    const [errors, setErrors] = useState(errorsSchema)

    // const [firstTime, setFirstTime] = useState(true)

    function usePrevious(value) {
        const ref = useRef();
        useEffect(() => {
            ref.current = value;
        });
        return ref.current;
    }

    useEffect(() => {
        // if(firstTime && form && Object.keys(form).length > 0){
        if(form && Object.keys(form).length > 0){

            const doValidate = async() => await validateForm()                              
            doValidate();

        }
    // eslint-disable-next-line react-hooks/exhaustive-deps 
    }, [form]);

    useEffect(() => {
        checkDisabled()
    // eslint-disable-next-line react-hooks/exhaustive-deps 
    }, [errors]);



    const validateForm = async() => {   
        console.log('validateForm')

        console.log(form)

        let tmpErrors = errors; 

        await Object.keys(validations).forEach(async name => {
            const error = await validate(name)
            
            tmpErrors = {...tmpErrors, 
                [name]: {
                    invalid: (error !== ''), 
                    message: error 
                }
            }

        })

        console.log(tmpErrors)
        setErrors(prevState => ({...prevState, ...tmpErrors}));
    }
    



    const checkDisabled = useCallback(() => {

        const isInvalid = Object.keys(validations).some(name => {
            return errors[name].invalid;
        });

        setSaveDisabled(isInvalid);

    }, [errors, validations]);


    const handleOnChange = useCallback(async(name,value) => {
    
        setForm(prevState => ({ ...prevState, [name]: value }));

        const error = await validate(name, value)
        setErrors(prevState => ({...prevState, 
            [name]: {
                invalid: (error !== ''), 
                message: error 
            }
        }));

        // eslint-disable-next-line react-hooks/exhaustive-deps   
    },[validations]);


    const validate = async (name, value=null) => {
        let error = ''

        if(!value && form) value = form[name];

        if(validations[name]){

            if (validations[name].required) {            
                if(Array.isArray(value) && value.length===0)
                    return "This is required field.";                                        
                else if (!value)
                    return "This is required field.";                
            }
            else{
                if(value==='') return ''
            }

            const { rules } = validations[name];

            if (rules && Array.isArray(rules)){

                rules.every(async rule => {
                    
                    // console.log(rule)
                    // console.log(value)

                    if (rule.regEx && !rule.regEx.test(value)) {
                        error = rule.message;
                        return false
                    }

                    if (rule.method) {

                        const result = await rule.method(value)

                        if(result.validated){

                            console.log('validated', result)
                            
                            if(!result.valid){                                                                
                                error = rule.message;
                                return false
                            }
                        }
                        else{                             
                            console.error(`Couldnt validate ([${name}] = ${value})`  )
                            console.error(result.message  )
                            error = `Couldnt validate ([${name}] = ${value})`
                            return false
                        }
                        
                    }

                    return true 
                
                })

            }
            

        }

        return error;
    }


    return { setForm, form, errors, saveDisabled, handleOnChange, validateForm};
}

export default useForm;