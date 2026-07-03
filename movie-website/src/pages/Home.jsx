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
      key: "c5efd35a1bebd615a54567f408aecbe9",
      format: "iframe",
      height: 250,
      width: 300,
      params: {},
    };

    const script = document.createElement("script");
    script.src = "https://www.highperformanceformat.com/c5efd35a1bebd615a54567f408aecbe9/invoke.js";
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
