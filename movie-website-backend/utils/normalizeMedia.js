export const normalizeMedia = (media) => {
  return {
    // basic info
    id: media.id,
    type: media.media_type || (media.title ? "movie" : "tv") || "unknown",

    title: media.title || media.name || "Untitled",
    original_title: media.original_title || media.original_name || "",

    overview: media.overview || "No description available.",

    // dates
    release_date: media.release_date || media.first_air_date || "Unknown",

    // images
    poster_path: media.poster_path
      ? `https://image.tmdb.org/t/p/w500${media.poster_path}`
      : null,

    backdrop_path: media.backdrop_path
      ? `https://image.tmdb.org/t/p/original${media.backdrop_path}`
      : null,

    // ratings
    rating: media.vote_average || 0,
    vote_count: media.vote_count || 0,
    popularity: media.popularity || 0,

    // language / region
    original_language: media.original_language || "unknown",

    // extra TV/movie info
    genre_ids: media.genre_ids || [],

    adult: media.adult || false,

    // TV specific (if available in some endpoints)
    first_air_date: media.first_air_date || null,
    origin_country: media.origin_country || [],

    // movie specific
    video: media.video || false,

    // useful for UI
    backdrop_blur: media.backdrop_path
      ? `https://image.tmdb.org/t/p/w500${media.backdrop_path}`
      : null,

    // display helpers
    year:
      media.release_date || media.first_air_date
        ? new Date(media.release_date || media.first_air_date).getFullYear()
        : null,

    rating_stars: media.vote_average ? Math.round(media.vote_average / 2) : 0,
  };
};
