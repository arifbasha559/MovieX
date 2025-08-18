export const TMDB_CONFIG = {
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  BASE_URL: "https://api.themoviedb.org/3",
  Headers: {
    accept: "application/json",
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMzMxZDIxNDlhYzU0NWRiNWY4MTQ5NDUzYjQzZDYwYyIsIm5iZiI6MTc1NTUyNzk1My43ODEsInN1YiI6IjY4YTMzYjExNWZlMzFlNmY3Zjc0NTY0MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.n93G3kj2nxhrJEEdIRx7_o_Yy74Paolx7GnmBjUNZ6Y`,
  },
};

export const fetchMovies = async ({ query }: { query?: string }) => {
  const endpoint = query
    ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}&sort_by=popularity.desc`
    : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;
  const response = await fetch(endpoint, {
    method: "GET",
    headers: TMDB_CONFIG.Headers,
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
//   console.log("Fetched movies:", response.status);
  const data: any =await response.json();
  
  return data.results;
};

