import React from "react";
import logo from "./logo.svg";
import "./App.css";
import TimesList from "./components/TimesList";
import AddTimeForm from "./components/AddTimeForm";

function App() {
    return (
        <div className="App">
            <h1>Just Clock It</h1>
            <TimesList />
            <AddTimeForm />
        </div>
    );
}

export default App;
