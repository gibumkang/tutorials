import React, { useState } from "react";
import firebase from "../firebase";

const Header = () => {
    const [user, setUser] = useState("stranger");

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            setUser(user);
        }
    });

    return <div>Howdy, {user}!</div>;
};

export default Header;
