import React from 'react'
import getConfig from 'next/config';
import fetch from 'isomorphic-unfetch';

const Movie = ({movie}) => {
    console.log(movie);
    return (
        <div>
            <h2>{movie.title}</h2>
            <p>{movie.description}</p>
        </div>
    )
}

export async function getServerSideProps(context){
    const {id} = context.query; //context is used with SSR, and the data is available in the terminal because it's serverside.
    const {API_URL} = process.env //destructure the URL
    const res = await fetch(`${API_URL}/movies/${id}`); //dynamic routing
    const data = await res.json(); //console.log(data) to ensure it's working: remember, it will show in the terminal
    return {
        props: {
            movie: data
        },
    }
}

export default Movie;