import styled from '@emotion/styled';
import Link from 'next/link';

export default function Card({movie}){
    const {API_URL} = process.env
    return (
        <CardStyled>
            <div className="poster">
                <img src={API_URL + movie.image[0].url} alt=""/>
                <h2>{movie.title}</h2>
                <Link href="/movies/[genre]/[slug]" as={`/movies/${movie.genre.slug}/${movie.slug}`}>
                    <a>More about this movie</a>
                </Link>
            </div>
        </CardStyled>
    )
}

const CardStyled = styled.div`
    max-width: 200px;
    height: auto;
    img {
        width: 100%;
        height: auto;
        object-fit: contain;
    }
`