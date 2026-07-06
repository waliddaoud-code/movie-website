import { useEffect, useRef } from "react";
import "../css/Home.css";
import MovieRow from "../components/MovieRow/MovieRow";
import Poster from "../components/Poster";
import  AdsterraBanner  from "../assets/useAdsterraBanner";
import  NativeAd  from "../assets/NativeAd";


function Home({ movies, tvShows }) {
 
  


  return (
    <div className="home">
      <Poster movies={movies.trendingAll} />

      <MovieRow title="Popular" movies={movies.popular} series={tvShows.popular} />

     <NativeAd />


      <MovieRow title="Trending" movies={movies.trending} series={tvShows.trending} />

       <AdsterraBanner
    adKey="b37c8ffb927736e7563e62d79974015f"
    width={420}
    height={60}
/>
       
      
      <MovieRow title="Top Rated" movies={movies.topRated} series={tvShows.topRated} />
    </div>
  );
}

export default Home;
