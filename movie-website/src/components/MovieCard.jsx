import "../css/MovieCard.css";
import { useNavigate } from "react-router-dom";

function MovieCard({ media }) {
  const navigate = useNavigate();

  function watchMovie() {
    if (media.type === "tv") {
      navigate(`/watch/tv/${media.id}/1/1`);
    } else {
      navigate(`/watch/movie/${media.id}`);
    }
  }

  return (
    <div className="movie-card" onClick={watchMovie}>
      <div className="movie-poster">
        <img
          src={`https://image.tmdb.org/t/p/w500${media.poster_path}`}
          alt={media.title}
        />
      </div>
      <div className="movie-info">
        <h3>{media.title}</h3>
        <p>{media.release_date?.split("-")[0]}</p>
      </div>
    </div>
  );
}

export default MovieCard;
