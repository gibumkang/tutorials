import React from "react";
import "./App.css";
import TimesList from "./components/TimesList";
import AddTimeForm from "./components/AddTimeForm";
import Header from "./components/Header";
import Signup from "./components/Signup";

function App() {
    return (
        <div className="App">
            <Header />
            <h1>Just Clock It</h1>
            <TimesList />
            <AddTimeForm />
            <Signup />
        </div>
    );
}

export default App;
