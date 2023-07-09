import API_KEY from './apiKey.js'

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
  let moviesArray = []
  let searchResultTitles = movies.map((movie) => movie.Title)

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
      console.log(movie)
      moviesHtml += `<div class="movies__movie">
          <div class="movies__poster">
            <img src="${movie.Poster}" />
          </div>
          <div class="movies__info">
          <div class="movies__row--info1">
          <h3>${movie.Title}</h3>
          <p>${movie.Ratings[0].Value.slice(0, 3)}</p>
          </div>
          <div class="movies__row--info2">
          <p>${movie.Runtime}</p>
          <p>${movie.Genre}</p>
          <button class="movies__watchlist--btn">Watchlist</button>
          </div>
          <div class="movies__row--info3">
          <p>${movie.Plot}</p>
          </div>
          </div>
          </div>
        </div>`
    })

    document.getElementById('movies').innerHTML = moviesHtml
  } catch (err) {
    console.error(err)
  }
}
