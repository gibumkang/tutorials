import React, { useState } from "react";
import firebase from "../firebase";

export const AddTimeForm = () => {
    const [title, setTitle] = useState("");
    const [time, setTime] = useState("");

    function onSubmit(e) {
        e.preventDefault();
        firebase
            .firestore()
            .collection("times")
            .add({
                title,
                time_seconds: parseInt(time),
            })
            .then(() => {
                setTitle("");
                setTime("");
            });
    }

    return (
        <div>
            <form action="" onSubmit={onSubmit}>
                <h2>Add Time Entry</h2>
                <div>
                    <label htmlFor="">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.currentTarget.value)}
                    />
                </div>
                <div>
                    <label htmlFor="">Time</label>
                    <input
                        type="number"
                        value={time}
                        onChange={(e) => setTime(e.currentTarget.value)}
                    />
                </div>
                <button>Add Time Entry</button>
            </form>
        </div>
    );
};

export default AddTimeForm;
