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
      moviesHtml += `
      <div class="movies__card">
      <img class="movies__poster" src="${movie.Poster}" />
      <div class="movies__info">
          <div class="movies__row__info1">
              <h3>${movie.Title}</h3>
              <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                      d="M5.78671 1.19529C6.01122 0.504306 6.98878 0.504305 7.21329 1.19529L8.01547 3.66413C8.11588 3.97315 8.40384 4.18237 8.72876 4.18237H11.3247C12.0512 4.18237 12.3533 5.11208 11.7655 5.53913L9.66537 7.06497C9.40251 7.25595 9.29251 7.59447 9.39292 7.90349L10.1951 10.3723C10.4196 11.0633 9.62875 11.6379 9.04097 11.2109L6.94084 9.68503C6.67797 9.49405 6.32203 9.49405 6.05916 9.68503L3.95903 11.2109C3.37125 11.6379 2.58039 11.0633 2.8049 10.3723L3.60708 7.90349C3.70749 7.59448 3.59749 7.25595 3.33463 7.06497L1.2345 5.53914C0.646715 5.11208 0.948796 4.18237 1.67534 4.18237H4.27124C4.59616 4.18237 4.88412 3.97315 4.98453 3.66414L5.78671 1.19529Z"
                      fill="#FEC654" />
              </svg>
              <p>${movie.Ratings[0].Value.slice(0, 3)}</p>
          </div>
          <div class="movies__row__info2">
              <p>${movie.Runtime}</p>
              <p>${movie.Genre}</p>
              <button class="movies__watchlist--btn">Watchlist</button>
          </div>
          <div class="movies__row__info3">
              <p>${movie.Plot}</p>
          </div>
      </div>
  </div>
  </div>
  `
    })

    document.getElementById('movies').innerHTML = moviesHtml
  } catch (err) {
    console.error(err)
  }
}
