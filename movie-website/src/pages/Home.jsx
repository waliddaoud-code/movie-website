
import "../css/Home.css";
import MovieRow from "../components/MovieRow/MovieRow";
import Poster from "../components/Poster";



function Home({ movies, tvShows }) {
 
  return (
    <div className="home" >
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
