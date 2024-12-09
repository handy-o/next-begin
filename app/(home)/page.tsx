export const metadata = {
    title: 'Home'
}
const URL = "https://nomad-movies.nomadcoders.workers.dev/movies";

async function getMovies() {
    // await new Promise((res) => setTimeout(res, 5000))
    const resp = await fetch(URL); // NextJS에서 fetch된 url을 캐싱 
    const json = await resp.json();
    return json;
}
export default async function HomePage() {
    const movies = await getMovies();
    return (
        <div>
            <h1>Hello</h1>
            {JSON.stringify(movies)}
        </div>
    )
}