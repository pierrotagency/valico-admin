import { useState, useEffect, useCallback } from 'react';

import usePrevious from './usePrevious';

import { validateField } from '../helpers/validation';

interface Form {
	taxonomy: string;
	data: any;
}

function useForm(fieldSchema: any, validationSchema = {}) {
	const [form, setForm] = useState<any>();
	const [saveDisabled, setSaveDisabled] = useState(true);

	const [dirty, setDirty] = useState(false);

	const prevForm = usePrevious(form);

	// generate errors state array with every field (empty)
	const errorsSchema = { ...fieldSchema };
	Object.keys(errorsSchema).forEach((v) => {
		errorsSchema[v] = {
			invalid: false,
			message: '',
			origin: 'frontend',
		};
	});
	const [errors, setErrors] = useState(errorsSchema);

	const checkDisabled = useCallback(() => {
		if (!dirty) {
			// if nothing has been touched in the form, dont enable the save
			setSaveDisabled(true);
			return true;
		}

		const isInvalid = Object.keys(validationSchema).some(
			(name) => errors[name].invalid && errors[name].origin === 'frontend'
		);
		setSaveDisabled(isInvalid);
		return false;
	}, [errors, validationSchema, dirty]);

	const validateForm = async (validateAllFields = false) => {
		let validForm = true;

		if (!form || Object.keys(form).length === 0) return true;

		// TODO set all errrors at once in state
		Object.keys(validationSchema).forEach(async (name: string) => {
      // only validate the fields that changed (except validateAllFields is true)
      if (validateAllFields
		//   || form[name] !== prevForm[name] 
        ) {
        const error = await validateField(name, form[name], validationSchema);
        const valid = !!(typeof error === 'undefined' || error === '');

        if (!valid)
          validForm = false;

        setErrors((prevState: any) => ({
          ...prevState,
          [name]: {
            invalid: !valid,
            message: error,
            origin: 'frontend',
          },
        }));
      }
    });

		return validForm;
	};

	const handleOnChange = useCallback(
		async (name, value) => {
			setDirty(true);

			setForm((prevState: any) => ({ ...prevState, [name]: value }));			
		},
		// eslint-disable-next-line
		[validationSchema]
	);

	const setBackendErrors = (backErrors: any) => {
		// clean previous remote validation results, and set the new ones

		let newErrors = { ...errors };

		Object.keys(errors).forEach((err) => {
			if (newErrors[err].origin === 'backend') {
				newErrors[err].invalid = false;
				newErrors[err].message = '';
			}
		});

		backErrors.forEach((err: any) => {
			newErrors = {
				...newErrors,
				[err.field]: {
					invalid: true,
					message: err.message,
					origin: 'backend',
				},
			};
		});

		setErrors(newErrors);

		return newErrors;
	};

	useEffect(() => {
		const doValidate = async () => validateForm();
		if (dirty) doValidate();
		// if(dirty) validateForm()
		// eslint-disable-next-line
	}, [form]);

	useEffect(() => {
		checkDisabled();
		// eslint-disable-next-line
	}, [errors, dirty]);

	return {
		setForm,
		form,
		prevForm,
		errors,
		saveDisabled,
		handleOnChange,
		setBackendErrors,
		dirty,
		setDirty,
		validateForm,
	};
}

export default useForm;
