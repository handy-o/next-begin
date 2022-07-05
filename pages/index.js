import { useEffect, useState } from "react";
import Seo from "./components/Seo";

const API_KEY = "10923b261ba94d897ac6b81148314a3f";

export default function Home() {
  const [Movies, setMovies] = useState()
  useEffect(() => {
    (async () => {
      //const reponse = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`)    })
      //const json = await Response.json();
      const { results } = await (
        await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
        )
      ).json();
      setMovies(results);
    })();
  }, []);
  return (
    <div className="container">
      <Seo title="Home" />
      {!Movies && <h4>Loading...</h4>} {/*mount되고 기다렸다가*/}
      {/*화면 출력*/}
      {Movies?.map((movie) => (
        <div className="movie" key={movie.id}>
          <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
          <h4>{movie.original_title}</h4>
        </div>
      ))}


      {/* 스타일 */}
      <style jsx>{`
        .container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          padding: 20px;
          gap: 20px;
        }
        .movie img {
          max-width: 100%;
          border-radius: 12px;
          transition: transform 0.2s ease-in-out;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        }
        .movie:hover img {
          transform: scale(1.05) translateY(-10px);
        }
        .movie h4 {
          font-size: 18px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}