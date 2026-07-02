import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import NavBar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import { WatchMovie } from "./pages/WatchMovie";
import { API } from "./api";

import "./css/App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const response = await fetch(`${API}/movies`);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        setMovies(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load movies.");
      } finally {
        setLoading(false);
      }
    };

    loadMovies();

    const loadTvShows = async () => {
      try {
        const response = await fetch(`${API}/tvshows`);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        setTvShows(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load TV shows.");
      }
    };

    loadTvShows();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="app">
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route
            path="/"
            element={<Home movies={movies} tvShows={tvShows} />}
          />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/watch/movie/:id" element={<WatchMovie />} />
          <Route
            path="/watch/tv/:id/:season/:episode"
            element={<WatchMovie />}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
