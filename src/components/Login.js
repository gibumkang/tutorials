import React, { useState } from 'react';
import { navigate } from 'gatsby';
import useAuth from '../hooks/useAuth';

const Login = ({ redirect }) => {
    //state and login are helper functions imported from useAuth()
    const { state, login } = useAuth();
    //identifier and password are local states
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            //login() is a helper function from useAuth()
            await login({ identifier, password });
            //navigate is a function from gatsby, not router
            navigate(redirect);
        } catch (e) {
            console.log('Error occured during authentication');
            const {
                response: {
                    data: {
                        message: [
                            {
                                messages: [error],
                            },
                        ],
                    },
                },
            } = e;
            const { message: msg } = error;
            setError(msg);
        }
    };
    return (
        <div className="w-full max-w-xs">
            <pre>{JSON.stringify({ state }, null, 2)}</pre>
            <form action="" onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label htmlFor="" className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Username
                    </label>
                    <input
                        onChange={(e) => {
                            setIdentifier(e.target.value);
                        }}
                        value={identifier}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="username"
                        type="text"
                        placeholder="Username"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        value={password}
                        className="shadow appearance-none border border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        placeholder="******************"
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Sign In
                    </button>
                </div>
            </form>
            {error.length > 1 && <p className="text-center text-red-500 bg-red-200 border p-2">{error}</p>}
            <p className="text-center text-gray-500 text-xs">&copy;2020 Gatsby Authentication. All rights reserved.</p>
        </div>
    );
};

export default Login;
