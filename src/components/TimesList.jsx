import React, { useState, useEffect } from "react";
import firebase from "../firebase";

const SORT_OPTIONS = {
    TIME_ASC: { column: "time_seconds", direction: "asc" },
    TIME_DESC: { column: "time_seconds", direction: "desc" },
    TITLE_ASC: { column: "title", direction: "asc" },
    TITLE_DESC: { column: "title", direction: "desc" },
};

//API used to call firestore
function useTimes(sortBy = "TIME_ASC") {
    const [times, setTimes] = useState([]);
    useEffect(() => {
        //the below an unsubscribe callback
        const unsubscribe = firebase
            //firebase connection to fetch data
            .firestore()
            .collection("times")
            .orderBy(
                SORT_OPTIONS[sortBy].column,
                SORT_OPTIONS[sortBy].direction
            )
            //on snapshot, grab the id and data from firebase and assign to a new const
            .onSnapshot((snapshot) => {
                const newTimes = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                //update state with the data fetched from firebase
                setTimes(newTimes);
            });
        //run unsubscribe when component is unmounted
        return () => unsubscribe();
    }, [sortBy]);
    return times;
}

const TimesList = () => {
    const [sortBy, setSortBy] = useState("TIME_ASC");
    // referencing times calls the useTimes function declared above
    const times = useTimes(sortBy);
    return (
        <div>
            <h2>Times List</h2>
            <div>
                <label htmlFor="">Sort By:</label>
                <select
                    name=""
                    id=""
                    value={sortBy}
                    onChange={(e) => setSortBy(e.currentTarget.value)}
                >
                    <option value="TIME_ASC">Time (fastest first)</option>
                    <option value="TIME_DESC">Time (slowest first)</option>
                    <option value="" disabled>
                        --
                    </option>
                    <option value="TITLE_ASC">Title (a-z)</option>
                    <option value="TITLE_DESC">Title (z-a)</option>
                </select>
            </div>
            <ol>
                {/* running the map filter kicks off the times const, referenced above */}
                {/* once the function above is reviewed, the state is updated 
                with the data from firebase and outputted here */}
                {times.map((time) => (
                    <li key={time.id}>
                        <div className="time-entry">
                            {time.title}
                            <code className="time">
                                {time.time_seconds} seconds
                            </code>
                        </div>
                    </li>
                ))}
            </ol>
        </div>
    );
};

export default TimesList;
