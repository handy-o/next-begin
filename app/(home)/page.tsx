import Movie from "../../components/movie";
import styles from "../../styles/home.module.css";
export const metadata = {
}
export const API_URL = "https://nomad-movies.nomadcoders.workers.dev/movies";

async function getMovies() {
    // await new Promise((res) => setTimeout(res, 5000))
    const resp = await fetch(API_URL); // NextJS에서 fetch된 url을 캐싱 
    const json = await resp.json();
    return json;
}
export default async function HomePage() {
    const movies = await getMovies();
    return (
        <div className={styles.container}> 
            {movies.map((movie) =>(
                // <div key={movie.id}>
                //     <img src={movie.poster_path} alt={movie.title} />
                //     <Link href={`/movies/${movie.id}`}>{movie.title}</Link>
                // </div>
                <Movie 
                    key={movie.id} 
                    id={movie.id}
                    poster_path={movie.poster_path}
                    title={movie.title}
                />
            ))}
        </div>
    )
}