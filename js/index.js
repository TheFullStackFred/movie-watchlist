import { generateMovieHtml, addWatchListBtnEventListener } from '../utils.js'
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
