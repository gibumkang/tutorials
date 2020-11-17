import React, { useContext } from 'react';
import useFormValidation from '../Auth/useFormValidation';
import validateCreateLink from '../Auth/validateCreateLink';
import FirebaseContext from '../../firebase/context';

const INITIAL_STATE = {
    description: '',
    url: '',
};

function CreateLink(props) {
    const { firebase, user } = useContext(FirebaseContext);
    const { handleSubmit, handleChange, values, errors } = useFormValidation(INITIAL_STATE, validateCreateLink, handleCreateLink);
    function handleCreateLink() {
        if (!user) {
            props.history.push('/login');
        } else {
            const { url, description } = values;
            const newLink = {
                url,
                description,
                postedBy: {
                    id: user.uid,
                    name: user.displayName,
                },
                voteCount: 0,
                votes: [],
                comments: [],
                created: Date.now(),
            };
            firebase.db.collection('links').add(newLink);
            props.history.push('/');
        }
    }
    return (
        <form className="flex flex-column" onSubmit={handleSubmit}>
            <input type="text" name="description" placeholder="A description for your link" autoComplete="off" value={values.description} onChange={handleChange} className={errors.description && 'error-input'} />
            {errors.description && <p className="error-text">{errors.description}</p>}
            <input type="url" name="url" placeholder="This is the URL for the link" autoComplete="off" value={values.url} onChange={handleChange} className={errors.url && 'error-input'} />
            {errors.url && <p className="error-text">{errors.url}</p>}
            <button className="button" type="submit">
                Submit
            </button>
        </form>
    );
}

export default CreateLink;
