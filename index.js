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
      moviesHtml += `<div class="movie__container">
          <div class="movie__poster">
            <img src="${movie.Poster}" />
          </div>
          <div class="movie__title-rank">
            <h3>${movie.Title}</h3>
            <p></p>
          </div>
        </div>`
    })

    document.getElementById('movie').innerHTML = moviesHtml
  } catch (err) {
    console.error(err)
  }
}
