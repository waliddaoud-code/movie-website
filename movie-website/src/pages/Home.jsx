import { useEffect, useState } from "react";
import "../css/Home.css";
import MovieRow from "../components/MovieRow/MovieRow";
import Poster from "../components/Poster";

function Home() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const response = await fetch("http://localhost:5000/movies/home");

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        setMovies(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load movies.");
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="home">
      <Poster movies={movies.trending} />

      <MovieRow title=" Popular Movies" movies={movies.popular} />
      <MovieRow title=" Top Rated" movies={movies.topRated} />
    </div>
  );
}

export default Home;
