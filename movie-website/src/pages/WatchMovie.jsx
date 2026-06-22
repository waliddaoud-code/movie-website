import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import "../css/WatchMovie.css";

export function WatchMovie() {
  const { id, season, episode } = useParams();
  const currentEpisode = Number(episode);
  const isTV = !!season;
  const navigate = useNavigate();

  const [servers, setServers] = useState([]);
  const [currentServer, setCurrentServer] = useState("");
  const [episodesList, setEpisodesList] = useState([]);

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const res = await fetch(`http://localhost:5000/tv/${id}/${season}`);

        const data = await res.json();

        setEpisodesList(data.episodes);
        console.log("Fetched episodes:", data.episodes);
      } catch (err) {
        console.error("Failed to load episodes:", err);
      }
    };
    if (season) {
      fetchEpisodes();
    }
  }, [id, season]);

  const goNext = () => {
    if (currentEpisode < episodesList.length) {
      navigate(`/watch/tv/${id}/${season}/${currentEpisode + 1}`);
    }
  };

  const goPrev = () => {
    if (currentEpisode > 1) {
      navigate(`/watch/tv/${id}/${season}/${currentEpisode - 1}`);
    }
  };

  useEffect(() => {
    const fetchServers = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/watch/${isTV ? "tv" : "movie"}`,
        );
        const data = await res.json();

        setServers(data);
        setCurrentServer(data[0]);
        console.log("Fetched servers:", data);
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
      <div className="episode-nav">
        <button onClick={goPrev} disabled={currentEpisode <= 1}>
          Prev
        </button>

        <span>Episode {currentEpisode}</span>

        <button
          onClick={goNext}
          disabled={currentEpisode >= episodesList.length}
        >
          Next
        </button>
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
