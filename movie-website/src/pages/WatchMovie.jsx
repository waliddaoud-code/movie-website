import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import "../css/WatchMovie.css";

export function WatchMovie() {
  const { id, season, episode } = useParams();
  const isTV = !!season;

  const [servers, setServers] = useState([]);
  const [currentServer, setCurrentServer] = useState("");

  useEffect(() => {
    const fetchServers = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/watch/${isTV ? "tv" : "movie"}`,
        );
        const data = await res.json();

        setServers(data);
        setCurrentServer(data[0]);
      } catch (err) {
        console.error("Failed to load servers:", err);
      }
    };

    fetchServers();
  }, [isTV]);

  const src = isTV
    ? `${currentServer}/${id}/${season}/${episode}?color=e50914`
    : `${currentServer}/${id}?color=e50914`;
  console.log(currentServer);

  return (
    <div className="main-page">
      <div className="movie-wrapper">
        {currentServer && (
          <iframe
            src={src}
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
      </div>
    </div>
  );
}
