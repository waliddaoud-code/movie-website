import { useEffect } from "react";
import "../css/Home.css";
import MovieRow from "../components/MovieRow/MovieRow";
import Poster from "../components/Poster";
import BannerAd from "../components/ads/banner";
import BannerAd2 from "../components/ads/banner2";
import Notif from "../components/ads/notif";

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
      <Notif />
      <Poster movies={movies.trendingAll} />

      <MovieRow
        title="Popular"
        movies={movies.popular}
        series={tvShows.popular}
      />

      <div className="banner-container">
        <BannerAd />
      </div>

      <MovieRow
        title="Trending"
        movies={movies.trending}
        series={tvShows.trending}
      />
      <div className="banner-container">
        <BannerAd2 />
      </div>

      <MovieRow
        title="Top Rated"
        movies={movies.topRated}
        series={tvShows.topRated}
      />
    </div>
  );
}

export default Home;
