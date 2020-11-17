import React, { useState } from 'react';

function useFormValidation(initialState, validate, authenticate) {
    const [values, setValues] = useState(true);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setSubmitting] = useState(false);

    React.useEffect(() => {
        if (isSubmitting) {
            const noErrors = Object.keys(errors).length === 0;
            if (noErrors) {
                console.log('authed');
                authenticate();
                setSubmitting(false);
            } else {
                setSubmitting(false);
            }
        }
    }, [errors]);

    function handleChange(e) {
        //persist must be included for the event to persist
        e.persist();
        //updater pattern, mentioned in readme.md
        setValues((prevValues) => ({
            ...prevValues,
            [e.target.name]: e.target.value,
        }));
    }

    function handleBlur() {
        const validationErrors = validate(values);
        setErrors(validationErrors);
    }

    function handleSubmit(e) {
        e.preventDefault();
        //we have access to validate, which is from validateLogin
        //because it was passed from Login.js along with INITIAL_STATE
        const validationErrors = validate(values);
        setErrors(validationErrors);
        setSubmitting(true);
    }
    //to make it accessible to other components
    return { handleChange, handleBlur, errors, isSubmitting, handleSubmit, values };
}

export default useFormValidation;
