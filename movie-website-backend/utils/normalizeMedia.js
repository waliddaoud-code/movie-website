export const normalizeMedia = (media) => {
  return {
    id: media.id,
    title: media.title || media.name || "Untitled",
    overview: media.overview || "No description available.",
    release_date: media.release_date || media.first_air_date || "Unknown",
    poster_path: media.poster_path
      ? `https://image.tmdb.org/t/p/w500${media.poster_path}`
      : null,
    backdrop_path: media.backdrop_path
      ? `https://image.tmdb.org/t/p/original${media.backdrop_path}`
      : null,
    type: media.media_type || (media.title ? "movie" : "tv") || "unknown",
    rating: media.vote_average || "N/A",
    vote_count: media.vote_count || 0,
  };
};
