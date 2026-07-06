import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { API } from "../api";
import  NativeAd  from "../assets/NativeAd";
import  AdsterraBanner  from "../assets/useAdsterraBanner";
import "../css/WatchMovie.css";

export function WatchMovie() {
  const { id, season, episode } = useParams();
  const [movie, setMovie] = useState(null);
  const currentEpisode = Number(episode);
  const isTV = !!season;
  const navigate = useNavigate();

  const [servers, setServers] = useState([]);
  const [currentServer, setCurrentServer] = useState("");
  const [seasons, setSeasons] = useState([]);
  const [episodesList, setEpisodesList] = useState([]);

  useEffect(() => {
    const fetchMovie = async () => {
      if (isTV) return;

      try {
        const res = await fetch(`${API}/details/${id}`);
        const data = await res.json();
        setMovie(data);
      } catch (err) {
        console.error("Failed to load movie data:", err);
      }
    };

    fetchMovie();
  }, [id, isTV]);

  useEffect(() => {
    const fetchShow = async () => {
      if (!isTV) return;
      try {
        const res = await fetch(`${API}/tv/${id}`);
        const data = await res.json();

        setSeasons(data.seasons);

        console.log("Fetched seasons:", data);
      } catch (err) {
        console.error("Failed to load seasons:", err);
      }
    };
    fetchShow();
  }, [id, isTV]);

  useEffect(() => {
    const fetchEpisodes = async () => {
      if (!isTV) return;

      try {
        const res = await fetch(`${API}/tv/${id}/${season}`);

        const data = await res.json();

        setEpisodesList(data.episodes);
      } catch (err) {
        console.error("Failed to load episodes:", err);
      }
    };
    if (season) {
      fetchEpisodes();
    }
  }, [id, season, isTV]);

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
        const res = await fetch(`${API}/watch/${isTV ? "tv" : "movie"}`);
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
      {isTV && (
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
      )}

      <div className="servers-list">
        {servers.map((server, index) => (
          <div
            key={index}
            className={`server ${currentServer === server ? "active" : ""}`}
            onClick={() => setCurrentServer(server)}
          >
            Server {index + 1}
          </div>
        ))}
      </div>

          <NativeAd />

      <div className="seasons-list">
        {seasons.map((s) => (
          <button
            key={s.season_number}
            onClick={() => navigate(`/watch/tv/${id}/${s.season_number}/1`)}
          >
            Season {s.season_number}
          </button>
        ))}
      </div>
      <div className="episode-list">
        {episodesList.map((ep) => (
          <button
            key={ep.id}
            onClick={() =>
              navigate(`/watch/tv/${id}/${season}/${ep.episode_number}`)
            }
          >
            Episode {ep.episode_number} - {ep.name}
          </button>
        ))}
      </div>

      <div className="description">
        <h2>Description</h2>

        <p>
          {isTV
            ? episodesList.find((e) => e.episode_number === currentEpisode)
                ?.overview
            : movie?.overview}
        </p>
      </div>
             <AdsterraBanner
    adKey="c5efd35a1bebd615a54567f408aecbe9"
    width={250}
    height={300}
/>
    </div>
  );
}
