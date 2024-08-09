const API_URL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API = "https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query=";

const form = document.getElementById("form");
const search = document.getElementById("search");
const main = document.getElementById("main");

getMovies(API_URL);

async function getMovies(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch');
    const data = await res.json();
    displayMovies(data.results);
  } catch (error) {
    console.error('Error:', error);
    main.innerHTML = `<p class="error">Unable to fetch movies. Please try again later.</p>`;
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const query = search.value.trim();
  if (query) {
    getMovies(`${SEARCH_API}${encodeURIComponent(query)}`);
  } else {
    getMovies(API_URL);
  }
  search.value = "";
});

function displayMovies(movies) {
  main.innerHTML = "";
  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");

    movieEl.innerHTML = `
      <img src="${IMG_PATH + poster_path}" alt="${title}">
      <div class="movie-info">
        <h3>${title}</h3>
        <div class="rating"><i class="fas fa-star"></i>${vote_average}</div>
      </div>
      <div class="overview">
        <h3>${title}</h3>
        <p>${overview}</p>
      </div>
    `;

    main.appendChild(movieEl);
  });
}
