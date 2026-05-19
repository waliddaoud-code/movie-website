import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import "../css/WatchMovie.css";

export function WatchMovie({ movies }) {
  const { id } = useParams();

  const [servers, setServers] = useState([]);
  const [currentServer, setCurrentServer] = useState("");

  useEffect(() => {
    const fetchServers = async () => {
      try {
        const res = await fetch("http://localhost:5000/movies/watch");
        const data = await res.json();

        setServers(data);
        setCurrentServer(data[0]);
      } catch (err) {
        console.error("Failed to load servers:", err);
      }
    };

    fetchServers();
  }, []);
  console.log("movies in WatchMovie:", movies);

  return (
    <div className="main-page">
      <div className="movie-wrapper">
        {currentServer && (
          <iframe
            src={`${currentServer}/${id}?color=e50914`}
            frameBorder="0"
            allowFullScreen
            title="Movie Player"
            className="player"
          />
        )}
      </div>

      <div className="servers-list">
        {servers.map((server, index) => (
          <div
            key={index}
            className="server"
            onClick={() => setCurrentServer(server)}
          >
            Server {index + 1}
          </div>
        ))}
      </div>
      <div className="description">
        <h2>Description</h2>
        <p>{movies.trending[2]?.overview}</p>
      </div>
    </div>
  );
}
