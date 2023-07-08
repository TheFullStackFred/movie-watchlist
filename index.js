const searchInput = document.getElementById('search__input')
const searchBtn = document.getElementById('search__btn')

searchBtn.addEventListener('click', searchMovie)
function searchMovie(e) {
  e.preventDefault()
  console.log(searchInput.value)
}
