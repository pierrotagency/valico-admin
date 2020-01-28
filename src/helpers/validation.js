
const checkRules = (name, rules, value, currentElement) => {
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
                    currentElement: (currentElement ? currentElement : null)                        
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


const validateField = async (name, value, validationSchema = null, currentElement = null) => {
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
        const hasError = await checkRules(name, rules, value, currentElement)
        var errors = hasError.filter(el => el !== null && el !== '')
        
        return errors[0] || ''
    }

    return ''
}


const parseBackendValidations = ( fields=[], forSubmit=false, validationSchema) => {
        
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

export { validateField, parseBackendValidations }