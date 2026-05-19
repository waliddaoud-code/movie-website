import "./Poster.css";
import { useEffect, useRef } from "react";

function Poster({ movies = [] }) {
  const containerRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !movies?.length) return;

    const allItems = () =>
      Array.from(container.querySelectorAll(".poster-item"));

    const scrollStep = () => {
      const items = allItems();
      if (!items.length) return;

      const step = items[0].offsetWidth + 16; // gap

      container.scrollBy({
        left: step,
        behavior: "smooth",
      });

      const halfWidth = container.scrollWidth / 2;

      // 👇 when reaching second half, silently reset
      if (container.scrollLeft >= halfWidth) {
        container.scrollTo({
          left: 0,
          behavior: "auto", // IMPORTANT: no animation
        });
      }
    };

    intervalRef.current = setInterval(scrollStep, 4000);

    return () => clearInterval(intervalRef.current);
  }, [movies]);

  return (
    <div className="poster-container" ref={containerRef}>
      {[...movies, ...movies].map((movie, i) => (
        <div className="poster-item" key={movie.id + "-" + i}>
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
