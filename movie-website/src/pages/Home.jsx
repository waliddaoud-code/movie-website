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
      key: "d55a5755b84e9d77a7f6e38327383c7b",
      format: "iframe",
      height: 600,
      width: 160,
      params: {},
    };

    const script = document.createElement("script");
    script.src = "https://www.highperformanceformat.com/d55a5755b84e9d77a7f6e38327383c7b/invoke.js";
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
