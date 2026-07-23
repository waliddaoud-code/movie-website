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

      <iframe src="//a.magsrv.com/iframe.php?idzone=5984118&size=900x250" width="900" height="250" scrolling="no" marginwidth="0" marginheight="0" frameborder="0"></iframe>
     

      <MovieRow
        title="Top Rated"
        movies={movies.topRated}
        series={tvShows.topRated}
      />
     
    </div>
  );
}

export default Home;
