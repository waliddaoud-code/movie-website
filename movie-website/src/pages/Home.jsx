import { useEffect } from "react";
import "../css/Home.css";
import MovieRow from "../components/MovieRow/MovieRow";
import Poster from "../components/Poster";
import BannerAd from "../components/banner";



function Home({ movies, tvShows }) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/popunder.js"; // public/popunder.js
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
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

      <BannerAd />

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
