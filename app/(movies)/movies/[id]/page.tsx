import { Suspense } from "react";
// import { API_URL } from "../../../(home)/page";
import MovieInfo from "../../../../components/movie-info";
import MovieVideos from "../../../../components/movie-video";

// async function getMovie(id:string) {
//     const response = await fetch(`${API_URL}/${id}`);
//     return response.json();
// }

// async function getVideos(id: string) {
//     const response = await fetch(`${API_URL}/${id}/videos`);
//     return response.json();
// }

export default async function MovieDetail({
    params: {id},
    }: {
    params: {id: string};
    }) {
    // console.log('props', props)
    // const movie = await getMovie(id); // 순차
    // const videos = await getVideos(id); // 실행
    // const [movie, videos] = await Promise.all([getMovie(id), getVideos(id)]); // 병렬 실행
    // return <h1>{movie.title} </h1>
    return <div>
        <Suspense fallback={<h1>Loading movie Info</h1>}>
            <MovieInfo id={id}/>
        </Suspense>
        <Suspense fallback={<h1>Loading movie videos</h1>}>
            <MovieVideos id={id}/>
        </Suspense>
    </div>
}