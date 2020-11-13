import React, { useState } from 'react';
import useFormValidation from './useFormValidation';
import validateLogin from './validateLogin';

const INITIAL_STATE = {
    name: '',
    email: '',
    password: '',
};

function Login(props) {
    const { handleChange, handleSubmit, values } = useFormValidation(INITIAL_STATE, validateLogin);
    const [login, setLogin] = useState(true);
    return (
        <div>
            <h2 className="mv3">{login ? 'Login' : 'Create Account'}</h2>
            <form onSubmit={handleSubmit} action="" className="flex flex-column">
                {!login && <input onChange={handleChange} value={values.name} name="name" type="text" placeholder="Your Name" autoComplete="off" />}
                <input onChange={handleChange} value={values.email} type="email" name="email" placeholder="Your Email" autoComplete="off" />
                <input onChange={handleChange} value={values.password} type="password" name="password" placeholder="Choose a secure password" autoComplete="off" />
                <div className="flex mt3">
                    <button className="button pointer mr2" type="submit">
                        Submit
                    </button>
                    <button className="pointer button" type="button" onClick={() => setLogin((prevLogin) => !prevLogin)}>
                        {login ? 'Create an account' : 'Already have an account?'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Login;
