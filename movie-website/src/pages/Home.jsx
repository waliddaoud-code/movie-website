import { useEffect } from "react";
import "../css/Home.css";
import MovieRow from "../components/MovieRow/MovieRow";
import Poster from "../components/Poster";

function Home({ movies, tvShows }) {
  useEffect(() => {
  const KEY = "last_popunder";
  const COOLDOWN = 45 * 1000;

  const loadPopunder = () => {
    const last = Number(localStorage.getItem(KEY) || "0");

    if (Date.now() - last < COOLDOWN) return;

    const script = document.createElement("script");
    script.dataset.zone = "11235916";
    script.src = "https://al5sm.com/tag.min.js";

    document.body.appendChild(script);

    localStorage.setItem(KEY, Date.now().toString());
  };

  loadPopunder();

  const interval = setInterval(loadPopunder, COOLDOWN);

  return () => {
    clearInterval(interval);
  };
}, []);
  return (
    <div className="home">
      <Poster movies={movies.trendingAll} />

      <MovieRow
        title="Popular"
        movies={movies.popular}
        series={tvShows.popular}
      />

      <MovieRow
        title="Trending"
        movies={movies.trending}
        series={tvShows.trending}
      />

      <MovieRow
        title="Top Rated"
        movies={movies.topRated}
        series={tvShows.topRated}
      />
    </div>
  );
}

export default Home;
