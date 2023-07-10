function generateMovieHtml(movie, jsFile) {
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
        !jsFile
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

function addWatchListBtnEventListener(moviesArray) {
  console.log(moviesArray)
  document.querySelectorAll('.movies__watchlist__add').forEach((btn) => {
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
    alert(`${selectedMovie.Title} already exists in the watchlist`)
  }
}

function deleteMovieFromWatchList() {}

export {
  generateMovieHtml,
  saveMovieToWatchList,
  addWatchListBtnEventListener,
  deleteMovieFromWatchList
}
