import { useState, useEffect, useCallback } from "react";


function useForm(stateSchema, validationSchema = {}) {

    const [state, setState] = useState(stateSchema);

    let errorsSchema = {...stateSchema}
    Object.keys(errorsSchema).forEach(v => errorsSchema[v] = '')
    const [errors, setErrors] = useState(errorsSchema);


    const [disable, setDisable] = useState(true);
   
  // Disable button in initial render.
    useEffect(() => {
        setDisable(true);
    }, []);

  // For every changed in our state this will be fired
  // To be able to disable the button
    useEffect(() => {
        
        if(state) Object.keys(stateSchema).forEach(v => doValidate(v))

    // eslint-disable-next-line react-hooks/exhaustive-deps   
    }, [state]);

  // Used to disable submit button if there's an error in state
  // or the required field in state has no value.
  // Wrapped in useCallback to cached the function to avoid intensive memory leaked
  // in every re-render in component
    const validateState = useCallback(() => {

        const hasErrorInState = Object.keys(validationSchema).some(key => {
            const isInputFieldRequired = validationSchema[key].required;
            const stateValue = state[key]; // state value
            const stateError = errors[key]; // state error

            return (isInputFieldRequired && !stateValue) || stateError;
        });

        return hasErrorInState;
    
    }, [state, errors, validationSchema]);


    const handleOnChange = useCallback((name,value) => {
      
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));

        doValidate(name,value)
        // eslint-disable-next-line react-hooks/exhaustive-deps   
    },[validationSchema]);


    const doValidate = (name,value=null) => {
        
        if(!value) value = state[name];

        let error = "";

        if(validationSchema[name]){

            if (validationSchema[name].required) {            
                if(Array.isArray(value)){
                    if(value.length===0){
                        error = "This is required field.";    
                    }
                }
                else if (!value) {
                    error = "This is required field.";
                }
            }

            if (validationSchema[name].validator !== null && typeof validationSchema[name].validator === "object") {
                if (value && !validationSchema[name].validator.regEx.test(value)) {
                    error = validationSchema[name].validator.error;
                }
            }

            setErrors(prevState => ({
                ...prevState,
                [name]: error 
            }));

        }

    }



    const isValid = async () => {
        
        const res = await validateState()

        console.log(res)
        return res;
    }

    return { state, setState, errors, disable, handleOnChange, isValid };
}

export default useForm;
