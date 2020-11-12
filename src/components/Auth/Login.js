import React, { useState } from 'react';

function Login(props) {
    const [login, setLogin] = useState(true);
    return (
        <div>
            <h2 className="mv3">Create Account</h2>
            <form action="" className="flex flex-column">
                {!login && <input type="text" placeholder="Your Name" autoComplete="off" />}
                <input type="email" placeholder="Your Email" autoComplete="off" />
                <input type="password" placeholder="Choose a secure password" autoComplete="off" />
                <div className="flex mt3">
                    <button className="button pointer mr2" type="submit">
                        Submit
                    </button>
                    <button className="pointer button" type="button" onClick={() => setLogin((prevLogin) => !prevLogin)}>
                        Already have an account?
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Login;
