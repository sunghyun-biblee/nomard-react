import { useState, useEffect } from "react";
import Movie from "../components/Movie";

function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const getmovies = async () => {
    /*async-await을 사용해보자*/
    const response = await fetch(
      "https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year"
    );
    const json = await response.json();
    setMovies(json.data.movies);
    setLoading(false);
  };
  useEffect(() => {
    /*
     fetch("https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year")
      .then((response) => response.json())
      .then((json) => {
        setMovies(json.data.movies);
        setLoading(false);
      });*/
    getmovies();
  }, []);

  console.log(movies);
  return (
    <div>
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <div>
          {movies.map((movie) => (
            <Movie
              // key는 react.js에서 매우 중요
              key={movie.id}
              //   key는 react.js에서만 , map안에서 component들을 render할때 사용
              coverImg={movie.medium_cover_image}
              title={movie.title}
              summary={movie.summary}
              genres={movie.genres}
            />
          ))}
          {/* 지금은 movie에 id값이 각각 고유하기때문에 index를 사용하지
          않아도된다. */}
        </div>
      )}
    </div>
  );
}

export default Home;
