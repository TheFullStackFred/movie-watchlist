import { generateMovieHtml, addWatchListBtnEventListener } from '../utils.js'

function renderWatchList() {
  const moviesEl = document.getElementById('movies')
  let currentWatchList = JSON.parse(localStorage.getItem('watchlist'))

  moviesEl.innerHTML = ''

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

renderWatchList()

export { renderWatchList }
