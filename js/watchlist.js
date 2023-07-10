const moviesEl = document.getElementById('movies')

let currentWatchList = JSON.parse(localStorage.getItem('watchlist'))

console.log(currentWatchList)
console.table(currentWatchList)

if (!currentWatchList) {
  moviesEl.innerHTML = `
  <h2 class="movies__message not-found">
  Your watchlist is looking a little empty...
</h2>
<a id="movies__add__movies__link" href="index.html"
  ><img src="assets/watchlist-icon.svg" />Let's add some movies!</a
>
  `

  moviesEl.style.height = '80vh'
}
