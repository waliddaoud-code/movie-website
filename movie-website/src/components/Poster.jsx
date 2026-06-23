import "./Poster.css";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function Poster({ movies = [] }) {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const intervalRef = useRef(null);
  console.log("Movies in Poster component:", movies);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !movies.length) return;

    const step = () => {
      const item = container.querySelector(".poster-item");
      if (!item) return;

      const move = item.offsetWidth + 16;

      const maxScroll = container.scrollWidth / 2;

      const nextScroll = container.scrollLeft + move;

      if (nextScroll >= maxScroll) {
        container.scrollTo({ left: 0, behavior: "auto" });
      } else {
        container.scrollBy({ left: move, behavior: "smooth" });
      }
    };

    intervalRef.current = setInterval(step, 4000);

    return () => clearInterval(intervalRef.current);
  }, [movies]);

  return (
    <div className="poster-container" ref={containerRef}>
      {[...movies, ...movies].map((movie, i) => (
        <div
          className="poster-item"
          key={movie.id + "-" + i}
          onClick={() =>
            navigate(
              movie.type === "tv"
                ? `/watch/tv/${movie.id}/1/1`
                : `/watch/movie/${movie.id}`,
            )
          }
          style={{ cursor: "pointer" }}
        >
          <img src={`${movie.backdrop_path}`} alt={movie.title} />
          <div className="poster-info">
            <h1>{movie.title}</h1>
            <span>
              {movie.release_date?.split("-")[0]} | <span>Rating: </span>{" "}
              {movie.vote_average}
            </span>
            <p>{movie.overview}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Poster;
