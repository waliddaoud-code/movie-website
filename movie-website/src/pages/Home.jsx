import { useCallback } from "react";
import "../css/Home.css";
import MovieRow from "../components/MovieRow/MovieRow";
import Poster from "../components/Poster";

// --- Monetag popunder config ---
const CAP_KEY = "monetag_pop_last_shown";
const CAP_HOURS = 24; // adjust as needed
const ZONE_ID = "11235916";
const TAG_SRC = "https://al5sm.com/tag.min.js";

function Home({ movies, tvShows }) {
  const triggerPopunder = useCallback(() => {
    const last = localStorage.getItem(CAP_KEY);
    const hoursSince = last ? (Date.now() - parseInt(last, 10)) / 3600000 : Infinity;

    if (hoursSince < CAP_HOURS) return; // still within cap window

    const script = document.createElement("script");
    script.src = TAG_SRC;
    script.setAttribute("data-zone", ZONE_ID);
    script.async = true;
    document.body.appendChild(script);

    localStorage.setItem(CAP_KEY, Date.now().toString());
  }, []);

  return (
    <div className="home" onClickCapture={triggerPopunder}>
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
