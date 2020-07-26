import { useState } from 'react';

import _get from 'lodash/get';
// import usePrevious from './usePrevious';

import { validateField } from '../helpers/validation';

// import {
//     // formDataToValidationSchema,
//     // getValidationSchemaKeys,
//     deepValidator
// } from "../../../../../../components/DynamicForm/utils";

function useDynamicForm(fieldSchema, validationSchema = {}) {
  const [dynamicForm, setDynamicForm] = useState({});

  // const [dirty, setDirty] = useState(false);

  //   const prevForm = usePrevious(dynamicForm);

  // const [errors, setErrors] = useState(errorsSchema)

  // useEffect(() => {
  //     // const doValidate = async() => await validateForm()
  //     // if(dirty) doValidate()
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [dynamicForm]);

  const validateDynamicForm = async (formData, formDataErrors, validateAllFields = false) => {
    // let errors = formDataErrors;
    console.log('validateAllFields', validateAllFields);
    if (!formData || Object.keys(formData).length === 0) return formDataErrors;

    // console.log('handleDynamicFormValidate', formData)

    // const pathSchema = formDataToValidationSchema(dynamicFormFieldSchema, "", formData);
    // console.log(pathSchema)
    // const fieldNames = getValidationSchemaKeys(pathSchema)
    // console.log(fieldNames)

    // const values = deepValidator(formData)
    // console.log(values)

    console.log(formData);

    Object.keys(validationSchema).forEach(async (name) => {
      console.log(name);

      const value = _get(formData, name, null);
      console.log(value);

      const errorObj = _get(formDataErrors, name, null);
      // console.log(errorObj)

      // if (!prevForm.data || !prevForm.data[name]
      // || value !== prevForm.data[name]
      // || validateAllFields) { // only validate the fields that changed
      const error = await validateField(name, value, validationSchema);
      console.log(error);
      if (typeof error !== 'undefined' && error !== '') {
        errorObj.__addError(error);
      }
      // }
    });

    console.log('END VAL');

    return formDataErrors;
  };

  return { dynamicForm, setDynamicForm, validateDynamicForm };
}

export default useDynamicForm;
