import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "../css/SearchBar.css";

export function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");

  const [results, setResults] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:5000/search?query=${encodeURIComponent(searchQuery)}`,
      );
      if (!res.ok) throw new Error("Search failed");
      const data = await res.json();
      setResults(data.results ?? []);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="search">
      <form
        onSubmit={handleSearch}
        className={`search-form ${showSearch ? "active" : ""}`}
      >
        <input
          type="text"
          placeholder="Search movies..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
        <ul className="results-list">
          {results.map((item) => (
            <li
              key={item.id}
              onClick={() => {
                setShowSearch(false);
                navigate(`/watch/${item.id}`);
              }}
            >
              <img src={item.poster_path} alt={item.title} />
              <span>{item.title}</span>
            </li>
          ))}
        </ul>
      </form>

      <FontAwesomeIcon
        icon={faSearch}
        color="white"
        size="2x"
        className="search-icon"
        onClick={() => setShowSearch(!showSearch)}
      />
    </div>
  );
}
