export default function MovieDetail({
    params: {id},
    }: {
    params: {id: string};
    }) {
    // console.log('props', props)
    return <h1>Movie {id} </h1>
}