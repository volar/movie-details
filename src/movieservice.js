const axios = require('axios')
const moviesUrl = "http://localhost:4504/movies";
const lodash = require("lodash"); 
let moviesList = null;

const loadMovies = async () => {
  try {
    const response = await axios.get(moviesUrl).then((response) => {
      moviesList = response.data;
    });
  } catch (err)  {
    return err;
  }
}

const getMovies = async (done) => {
    await loadMovies();
    if(moviesList){
      return done(null, moviesList);
    } 
    else {
      return done("No movies found", null);
    }
}

const getMovieById = async (movieId, done) => {
  let movie = null;
  const movieIdUrl = `${moviesUrl}/${movieId}`;

  try {
    await axios.get(movieIdUrl).then((response) => {
      movie = response.data;
      return done(undefined, movie);
    });
  } catch (err)  {
    return done("No movie found for the given movieId");
  }
}

const saveMovieDetails = async (movieDetails, done) => {
  let movie = null;

  try {
    await axios.post(moviesUrl, movieDetails).then((response) => {
      movie = response.data;
      return done(undefined, movie);
    });
  } catch (err)  {
    return done("Unable to save movie details");
  }
}

const updateMovieDetails = async (movieId, movieDetails, done) => {
 const movieIdUrl = `${moviesUrl}/${movieId}`;
 let movie = null;

  try {
    await axios.patch(movieIdUrl, movieDetails).then((response) => {
      movie = response.data;
      return done(undefined, movie);
    });
  } catch (err)  {
    return done("Unable to update movie details");
  }
}

const deleteMovieById = async (movieId, done) => {
  const movieIdUrl = `${moviesUrl}/${movieId}`;

  try {
    await axios.delete(movieIdUrl).then((response) => {
      movie = response.data;
      return done(undefined, movie);
    });
  } catch (err)  {
    return done("Unable to delete movie details");
  }
}

module.exports = {
  getMovies, getMovieById, saveMovieDetails, deleteMovieById, updateMovieDetails
}
