import { useEffect, useRef } from "react";
import "../css/Home.css";
import MovieRow from "../components/MovieRow/MovieRow";
import Poster from "../components/Poster";

function Home({ movies, tvShows }) {
  const bannerRef = useRef(null);

  useEffect(() => {
    if (!bannerRef.current) return;

    // Adsterra banner config
    window.atOptions = {
      key: "771b0ab5bd5d03c5d394b2174692df1a",
      format: "iframe",
      height: 60,
      width: 468,
      params: {},
    };

    const script = document.createElement("script");
    script.src = "https://www.highperformanceformat.com/771b0ab5bd5d03c5d394b2174692df1a/invoke.js";
    script.async = true;

    bannerRef.current.appendChild(script);

    return () => {
      if (bannerRef.current) {
        bannerRef.current.innerHTML = "";
      }
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

      {/* Adsterra Banner */}
      <div
        ref={bannerRef}
        style={{ width: 300, height: 250, margin: "20px auto" }}
      ></div>

      <MovieRow
        title="Trending"
        movies={movies.trending}
        series={tvShows.trending}
      />
         <div
        ref={bannerRef}
        style={{ width: 300, height: 250, margin: "20px auto" }}
      ></div>

      <MovieRow
        title="Top Rated"
        movies={movies.topRated}
        series={tvShows.topRated}
      />
    </div>
  );
}

export default Home;
