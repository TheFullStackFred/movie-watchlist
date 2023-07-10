import API_KEY from '/js/apiKey.js'

const moviesEl = document.getElementById('movies')
const searchInput = document.getElementById('search__input')
const searchBtn = document.getElementById('search__btn')

searchBtn.addEventListener('click', searchMovie)

async function searchMovie(e) {
  e.preventDefault()

  try {
    const res = await fetch(
      `http://www.omdbapi.com/?s=${searchInput.value}&apikey=${API_KEY}`
    )
    const data = await res.json()
    renderMovies(data.Search)
  } catch (err) {
    console.error(err)
  }
}

async function renderMovies(movies) {
  if (!movies) {
    moviesEl.innerHTML = `
    <h2 class="movies__message not-found">Unable to find what you’re looking for. Please try another search.</2>
    `
    moviesEl.style.height = '80vh'
    return
  }

  moviesEl.style.height = 'unset'
  let moviesArray = []
  const searchResultTitles = movies.map((movie) => movie.Title)

  try {
    let fetchPromises = searchResultTitles.map(async (title) => {
      const response = await fetch(
        `http://www.omdbapi.com/?t=${title}&apikey=${API_KEY}`
      )
      const data = await response.json()
      return data
    })

    moviesArray = await Promise.all(fetchPromises)

    let moviesHtml = ''

    moviesArray.forEach((movie) => {
      moviesHtml += generateMovieHtml(movie)
    })

    document.getElementById('movies').innerHTML = moviesHtml
  } catch (err) {
    console.error(err)
  }

  addWatchListBtnEventListener(moviesArray)
}

function generateMovieHtml(movie) {
  return `
  <div class="movies__card">
  <img class="movies__poster" src="${movie.Poster}" />
  <div class="movies__info">
    <div class="movies__row1">
      <h3 class="movies__title">${movie.Title}</h3>
      <img src="assets/rank-icon.svg" />
      ${
        movie.Ratings.length > 0
          ? `
      <p class="movies__rank">${movie.Ratings[0]?.Value.slice(0, 3)}</p>
      `
          : `
      <p class="movies__rank">N/A</p>
      `
      }
    </div>
    <div class="movies__row2">
      <p>${movie.Runtime}</p>
      <p>${movie.Genre}</p>
      <button
        class="movies__watchlist__btn"
        data-movie-id=" ${movie.imdbID}"
      >
        <img
          class="movies__watchlist__icon"
          src="assets/watchlist-icon.svg"
        />
        Watchlist
      </button>
    </div>
    <p class="movies__desc">${movie.Plot}</p>
  </div>
</div>
  `
}

function addWatchListBtnEventListener(moviesArray) {
  document.querySelectorAll('.movies__watchlist__btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const selectedMovie = moviesArray.find(
        (movie) => movie.imdbID === btn.dataset.movieId.trim()
      )
      saveMovieToWatchList(selectedMovie)
    })
  })
}

function saveMovieToWatchList(selectedMovie) {
  let currentWatchList = JSON.parse(localStorage.getItem('watchlist')) || []

  const movieExists = currentWatchList.find(
    (movie) => movie.imdbID === selectedMovie.imdbID
  )

  if (!movieExists) {
    currentWatchList.push(selectedMovie)
    localStorage.setItem('watchlist', JSON.stringify(currentWatchList))
    alert(`${selectedMovie.Title} added to watchlist`)
  } else {
    alert(`${selectedMovie.Title} already to exists in the watchlist`)
  }
}
