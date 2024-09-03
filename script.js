const apiKey = 'cf4c972fa8952105d35495878ac1f4b1'; // Replace with your TMDB API key

// const apiKey = 'YOUR_TMDB_API_KEY'; // Replace with your TMDB API key
const totalPages = 5; // Number of pages you want to fetch (adjust as needed)

// Function to fetch movies
function fetchMovies(page = 1) {
    const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${page}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            displayMovies(data.results);

            // Fetch next page if needed
            if (page < totalPages) {
                fetchMovies(page + 1);
            }
        })
        .catch(error => console.error('Error fetching movies:', error));
}

// Function to display movies
function displayMovies(movies) {
    const movieList = document.getElementById('movieList');
    
    movies.forEach(movie => {
        const movieItem = document.createElement('div');
        movieItem.className = 'movieItem';
        movieItem.dataset.id = movie.id;

        movieItem.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="${movie.title}">
            <h3>${movie.title}</h3>
        `;

        movieItem.addEventListener('click', () => fetchMovieDetails(movie.id));

        movieList.appendChild(movieItem);
    });
}

// Fetch and display movie details
function fetchMovieDetails(movieId) {
    const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(movie => {
            const movieList = document.getElementById('movieList');
            const movieDetails = document.getElementById('movieDetails');
            const detailsContent = document.getElementById('detailsContent');

            // Hide the movie list and show details
            movieList.style.display = 'none';
            movieDetails.classList.remove('hidden');

            detailsContent.innerHTML = `
                <h2>${movie.title}</h2>
                <p><strong>Rating:</strong> ${movie.vote_average}</p>
                <p><strong>Overview:</strong> ${movie.overview}</p>
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            `;
        })
        .catch(error => console.error('Error fetching movie details:', error));
}

// Add event listener to the back button
document.getElementById('backButton').addEventListener('click', () => {
    const movieList = document.getElementById('movieList');
    const movieDetails = document.getElementById('movieDetails');

    // Show the movie list and hide details
    movieList.style.display = 'grid';
    movieDetails.classList.add('hidden');
});

// Initial fetch of movies
fetchMovies();
