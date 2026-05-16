import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import MovieCard from "../MovieCard";
import { useRef } from "react";
import "./MovieRow.css";

function MovieRow({ title, movies = [] }) {
  const rowRef = useRef(null);

  const scroll = (direction) => {
    const container = rowRef.current;
    if (!container) return;

    const scrollAmount = 1300;

    container.scrollTo({
      left:
        direction === "left"
          ? container.scrollLeft - scrollAmount
          : container.scrollLeft + scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="movie-row">
      <h2>{title}</h2>

      <div className="row-wrapper">
        <MdChevronLeft
          className="scroll-btn"
          size={50}
          onClick={() => scroll("left")}
        />

        <div className="movies-scroll" ref={rowRef}>
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

        <MdChevronRight
          className="scroll-btn"
          size={50}
          onClick={() => scroll("right")}
        />
      </div>
    </div>
  );
}

export default MovieRow;
