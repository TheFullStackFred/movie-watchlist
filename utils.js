function generateMovieHtml(movie, watchlist) {
  return `
  <div class="movies__card">
  <img class="movies__poster" src="${movie.Poster}" />
  <div class="movies__info">
    <div class="movies__row1">
      <h3 class="movies__title">${movie.Title}</h3>
      <img src="/assets/rank-icon.svg" />
      <p class="movies__rank">${movie.Ratings[0]?.Value.slice(0, 3)}</p>
    </div>
    <div class="movies__row2">
      <p>${movie.Runtime}</p>
      <p>${movie.Genre}</p>
      ${
        !watchlist
          ? `
      <button
        class="movies__watchlist__add"
        data-movie-id=" ${movie.imdbID}"
      >
        <img class="movies__watchlist__icon" src="/assets/increment-icon.svg" />
        Watchlist</button
      >`
          : `<button
        class="movies__watchlist__delete"
        data-movie-id=" ${movie.imdbID}"
      >
        <img class="movies__watchlist__icon" src="/assets/decrement-icon.svg" />
        Watchlist</button
      >`
      }
    </div>
    <p class="movies__desc">${movie.Plot}</p>
  </div>
</div>
    `
}

function renderWatchList(watchlist) {
  const moviesEl = document.getElementById('movies')
  let currentWatchList = JSON.parse(localStorage.getItem('watchlist'))

  if (!currentWatchList) {
    moviesEl.innerHTML = `
      <h2 class="movies__message not-found">
      Your watchlist is looking a little empty...
      </h2>
      <a class="movies__add__movies__link" href="index.html"
      ><img
        class="movies__watchlist__icon"
        src="assets/watchlist-icon.svg"
      />Let's add some movies!</a
    >
    `

    moviesEl.style.height = '80vh'
  } else {
    currentWatchList.forEach((movie) => {
      moviesEl.innerHTML += generateMovieHtml(movie, 'watchlist.js')
    })
  }

  addWatchListBtnEventListener(currentWatchList, 'watchlist.js')
}

function addWatchListBtnEventListener(moviesArray, watchlist) {
  if (watchlist) {
    document.querySelectorAll('.movies__watchlist__delete').forEach((btn) => {
      btn.addEventListener('click', () => {
        const selectedMovie = moviesArray.find(
          (movie) => movie.imdbID === btn.dataset.movieId.trim()
        )
        deleteMovieFromWatchList(selectedMovie)
      })
    })
  } else {
    document.querySelectorAll('.movies__watchlist__add').forEach((btn) => {
      btn.addEventListener('click', () => {
        const selectedMovie = moviesArray.find(
          (movie) => movie.imdbID === btn.dataset.movieId.trim()
        )
        saveMovieToWatchList(selectedMovie)
      })
    })
  }
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
    alert(`${selectedMovie.Title} already exists in the watchlist`)
  }
}

function deleteMovieFromWatchList(selectedMovie) {
  let currentWatchList = JSON.parse(localStorage.getItem('watchlist')) || []

  const updatedWatchList = currentWatchList.filter(
    (movie) => movie.imdbID !== selectedMovie.imdbID
  )

  localStorage.setItem('watchlist', JSON.stringify(updatedWatchList))
  renderWatchList(updatedWatchList)
}

export {
  generateMovieHtml,
  renderWatchList,
  addWatchListBtnEventListener,
  saveMovieToWatchList,
  deleteMovieFromWatchList
}
