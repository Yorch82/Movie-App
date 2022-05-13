const API_KEY = 'api_key=222bd31d740eac11a8be3961350d67ab';
const URL_INDEX = 'https://api.themoviedb.org/3';
const API_URL = URL_INDEX + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = URL_INDEX + '/search/movie?' + API_KEY;

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

getMovies(API_URL);

async function getMovies (url) {
    try {
        const movies = await axios.get(url);        
        showMovies(movies.data.results);               
    } catch (error) {
        console.error(error);
    }
}

function showMovies (data) {
    
    main.innerHTML ='';

    data.forEach(movie => {
        console.log(movie);
        const {title, poster_path, vote_average, overview} = movie;
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');
        movieElement.innerHTML = `
        <img src="${IMG_URL+poster_path}" alt="${title}">

        <div class="movie-info">
            <h3>${title}</h3>
            <span class="green">${vote_average}</span>
        </div>

        <div class="overview">
            <h3>Overview</h3>
            ${overview}
        </div>        
        `
        main.appendChild(movieElement);
    });
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const movieToSearch = search.value;
    if (movieToSearch){
        getMovies(searchURL + '&query=' + movieToSearch); 
    } else {
        getMovies(API_URL);
    }      
})