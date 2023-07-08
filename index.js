import API_KEY from './apiKey.js'

const searchInput = document.getElementById('search__input')
const searchBtn = document.getElementById('search__btn')

searchBtn.addEventListener('click', searchMovie)
async function searchMovie(e) {
  e.preventDefault()
  const res = await fetch(
    ` http://www.omdbapi.com/?s=${searchInput.value}&apikey=${API_KEY}`
  )
  const data = await res.json()
  console.log(data)
}
