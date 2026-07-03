import { useEffect, useRef } from "react";
import "../css/Home.css";
import MovieRow from "../components/MovieRow/MovieRow";
import Poster from "../components/Poster";
import { useAdsterraBanner } from "../assets/useAdsterraBanner.js";

function Home({ movies, tvShows }) {
  const bannerRef = useAdsterraBanner({
    key: "771b0ab5bd5d03c5d394b2174692df1a",
    width: 468,
    height: 60,
  });

  return (
    <div className="home">
      <Poster movies={movies.trendingAll} />

      <MovieRow title="Popular" movies={movies.popular} series={tvShows.popular} />

      <div
        ref={bannerRef}
        style={{ width: 468, height: 60, margin: "20px auto" }}
      ></div>

      <MovieRow title="Trending" movies={movies.trending} series={tvShows.trending} />

          <div
        ref={bannerRef}
        style={{ width: 468, height: 60, margin: "20px auto" }}
      ></div>
      
      <MovieRow title="Top Rated" movies={movies.topRated} series={tvShows.topRated} />
    </div>
  );
}

export default Home;
