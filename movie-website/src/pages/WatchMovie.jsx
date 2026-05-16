import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { embedUrl } from "../services/api";

import "../css/WatchMovie.css";

export function WatchMovie() {
  const { id } = useParams();

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
    </div>
  );
}
