import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import MovieCard from "../MovieCard";
import { useRef, useState } from "react";
import "./MovieRow.css";

function MovieRow({ title, movies = [], series = [] }) {
  const rowRef = useRef(null);
  const [type, setType] = useState("movies"); // 👈 toggle state

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

  const dataToShow = type === "movies" ? movies : series;

  return (
    <div className="movie-row">
      <div className="top">
        <h2>{title}</h2>

        <div className="switch">
          <div
            className={`type ${type === "movies" ? "active" : ""}`}
            onClick={() => setType("movies")}
          >
            Movies
          </div>

          <div
            className={`type ${type === "series" ? "active" : ""}`}
            onClick={() => setType("series")}
          >
            Series
          </div>
        </div>
      </div>

      <div className="row-wrapper">
        <MdChevronLeft
          className="scroll-btn"
          size={50}
          onClick={() => scroll("left")}
        />

        <div className="movies-scroll" ref={rowRef}>
          {dataToShow.map((item) => (
            <MovieCard key={item.id} movie={item} />
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
