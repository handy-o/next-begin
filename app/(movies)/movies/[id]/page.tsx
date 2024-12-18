import { Suspense } from "react";
import MovieInfo, { getMovie } from "../../../../components/movie-info";
import MovieVideos from "../../../../components/movie-video";

interface IParams {
    params: {id: string}
}
export async function generateMetadata({params: {id}} : IParams) {
    const movie = await getMovie(id);
    return {
        title: movie.title
    }
}

export default async function MovieDetailMovieDetail({params: {id} }: IParams) {
    return <div>
        <Suspense fallback={<h1>Loading movie Info</h1>}>
            <MovieInfo id={id}/>
        </Suspense>
        <Suspense fallback={<h1>Loading movie videos</h1>}>
            <MovieVideos id={id}/>
        </Suspense>
    </div>
}