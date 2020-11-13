import React, { useState } from 'react';

function useFormValidation(initialState, validate) {
    const [values, setValues] = useState(true);
    function handleChange(e) {
        //persist must be included for the event to persist
        e.persist();
        //updater pattern, mentioned in readme.md
        setValues((prevValues) => ({
            ...prevValues,
            [e.target.name]: e.target.value,
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        //we have access to validate, which is from validateLogin
        //because it was passed from Login.js along with INITIAL_STATE
        validate(values);
        const validationErrors = validate(values);
        console.log({ values });
    }
    //to make it accessible to other components
    return { handleChange, handleSubmit, values };
}

export default useFormValidation;
