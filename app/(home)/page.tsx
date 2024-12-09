import Link from "next/link";

export const metadata = {
    title: 'Home'
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
        <div> {movies.map(movie => <li><Link href={`/movies/${movie.id}`}>{movie.title}</Link></li>)}</div>
    )
}