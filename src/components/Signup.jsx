import React, { useState, useEffect } from "react";
import firebase from "../firebase";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [user, setUser] = useState("");
    const onSubmit = (e) => {
        e.preventDefault();
        console.log(e);
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((user) => {
                //setUser(user);
            })
            .catch((err) => {
                // setError(err);
                // console.log(error);
            });
    };

    useEffect(() => {}, [user]);

    return (
        <form action="" onSubmit={onSubmit}>
            <h2>Sign Up</h2>
            <input
                type="text"
                placeholder="email"
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <button>One-click Sign-up</button>
            <div className="message"></div>
        </form>
    );
};

export default Signup;
