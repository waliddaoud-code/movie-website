export const API_KEY = "94723b959d1388276b660e9c9182f726";
export const BASE_URL = "https://api.themoviedb.org/3";
export const embedURL = [
  "https://vidsrc-embed.ru/embed/movie",  
  "https://www.vidking.net/embed/movie",
  "https://play.xpass.top/e/movie",
  "https://vidup.to/movie",
  "https://player.videasy.net/movie",

]

export const getPopularMovies = async () => {
 const response = await fetch (`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=1 `)
 const data = await response.json();
 return data.results;
 
}

export const getTopRatedMovies = async () => {
  const response = await fetch (`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&page=1`)
  const data = await response.json();
  return data.results;  
}
 



export const searchMovies = async (query) => {
 const response = await fetch (`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`)
 const data = await response.json();
 return data.results;
 
}