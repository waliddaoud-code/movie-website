import "../css/MovieCard.css"
import { useNavigate } from "react-router-dom"


function MovieCard({ movie }) {

    const navigate = useNavigate()

    function watchMovie() {
      navigate(`/watch/${movie.id}`)
    }


  return (
    <div className="movie-card" onClick={watchMovie}>
      <div className="movie-poster">
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
        
      </div>
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>{movie.release_date?.split("-")[0]}</p>
      </div>
    </div>
  )

}


export default MovieCard  