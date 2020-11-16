import React from 'react';
import useFormValidation from '../Auth/useFormValidation';
import validateCreateLink from '../Auth/validateCreateLink';

const INITIAL_STATE = {
    description: '',
    url: '',
};

function CreateLink(props) {
    const { handleSubmit, handleChange, values, errors } = useFormValidation(INITIAL_STATE, validateCreateLink, handleCreateLink);
    function handleCreateLink() {
        console.log('link created');
    }
    return (
        <form className="flex flex-column" onSubmit={handleSubmit}>
            <input type="text" name="description" placeholder="A description for your link" autoComplete="off" value={values.description} onChange={handleChange} className={errors.description && 'error-input'} />
            {errors.description && <p className="error-text">{errors.description}</p>}
            <input type="text" name="url" placeholder="This is the URL for the link" autoComplete="off" value={values.url} onChange={handleChange} className={errors.url && 'error-input'} />
            {errors.url && <p className="error-text">{errors.url}</p>}
            <button className="button" type="submit">
                Submit
            </button>
        </form>
    );
}

export default CreateLink;
