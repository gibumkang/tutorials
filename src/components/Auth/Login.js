import React, { useState } from 'react';
import useFormValidation from './useFormValidation';
import validateLogin from './validateLogin';
import firebase from '../../firebase';
import { Link } from 'react-router-dom';

const INITIAL_STATE = {
    name: '',
    email: '',
    password: '',
};

function Login(props) {
    const { handleChange, handleBlur, errors, isSubmitting, handleSubmit, values } = useFormValidation(INITIAL_STATE, validateLogin, authenticateUser);
    const [login, setLogin] = useState(true);
    const [firebaseError, setFirebaseError] = useState(null);

    async function authenticateUser() {
        const { name, email, password } = values;
        try {
            login ? await firebase.login(email, password) : await firebase.register(name, email, password);
            props.history.push('/');
        } catch (err) {
            console.error('Authenticated Error', err);
            setFirebaseError(err.message);
        }
    }

    return (
        <div>
            <h2 className="mv3">{login ? 'Login' : 'Create Account'}</h2>
            <form onSubmit={handleSubmit} action="" className="flex flex-column">
                {!login && <input onChange={handleChange} value={values.name} name="name" type="text" placeholder="Your Name" autoComplete="off" />}
                <input onChange={handleChange} onBlur={handleBlur} value={values.email} type="email" className={errors.email && 'error-input'} name="email" placeholder="Your Email" autoComplete="off" />
                {errors.email && <p className="error-text">{errors.email}</p>}
                <input onChange={handleChange} onBlur={handleBlur} value={values.password} className={errors.password && 'error-input'} type="password" name="password" placeholder="Choose a secure password" autoComplete="off" />
                {errors.password && <p className="error-text">{errors.password}</p>}
                {firebaseError && <p className="error-text">{firebaseError}</p>}
                <div className="flex mt3">
                    <button className="button pointer mr2" type="submit" disabled={isSubmitting} style={{ background: isSubmitting ? 'grey' : 'orange' }}>
                        Submit
                    </button>
                    <button className="pointer button" type="button" onClick={() => setLogin((prevLogin) => !prevLogin)}>
                        {login ? 'Create an account' : 'Already have an account?'}
                    </button>
                </div>
            </form>
            <div className="forgot-password">
                <Link to="/forgot">Forgot Password?</Link>
            </div>
        </div>
    );
}

export default Login;
