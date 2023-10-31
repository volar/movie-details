const express = require("express");
const router = express.Router();

const movieController = require("./moviecontroller");

/**
 * API to get the details of all movies
 * EFFECTIVE URL: GET /api/v1/movies
 */
router.get("/", (req, res) => {
  try {
    movieController.getMovies((err, results) => {
      if(err){
        return res.status(400).send(err);
      }
      return res.status(200).send({STATUS:"OK", data:results});
    })
  } catch (err) {
    return res.status(500).send("Unexpected error occurred, try again later");
  }
});
/**
 * API to get the details of specific movie
 * EFFECTIVE URL: GET /api/v1/movie/:movieId
 */
//
router.get("/:movieId", (req, res) => {
  try {
    const movieId = req.params.movieId;

    movieController.getMovieById(movieId, (err, results) => {
      if(err){
        return res.status(400).send(err);
      }
      return res.status(200).send({STATUS:"OK", data:results});
    });
  } catch (err) {
    return res.status(400).send("Unexpected error occurred, try after some time", err);
  }
});

/**
 * API to save new movie
 * EFFECTIVE URL: POST /api/v1/movies
 */
router.post("/", (req, res) => {
  try {
    const movieDetails = {
      movieName: req.body.movieName,
      director: req.body.director,
      rating: req.body.rating
    }

    movieController.saveMovieDetails(movieDetails, (err, results) => {
      if(err){
          return res.status(400).send(err);
      }
      return res.status(201).send({STATUS:"OK", data:results});
    });
  } catch (err) {
    return res.status(400).send("Unexpected error occurred, try after some time", err);
  }
});

/**
 * API to edit movie detail
 * EFFECTIVE URL: PATCH /api/v1/movies/:movieId
 */
router.patch("/:movieId", (req, res) => {
  try {
    const movieId = req.params.movieId;
    
    const movieDetails = {
      movieName: req.body.movieName,
      director: req.body.director,
      rating: req.body.rating
    }

    movieController.updateMovieDetails(movieId, movieDetails, (err, results) => {
      if(err){
        return res.status(400).send(err);
      }
      return res.status(201).send({STATUS:"OK", data:results});
    });

  } catch (err) {
    return res.status(400).send("Unexpected error occurred, try after some time", err);
  }
});

/**
 * API to delete movie
 * EFFECTIVE URL: DELETE /api/v1/movies/:movieId
 */
router.delete("/:movieId", (req, res) => {
  const movieId = req.params.movieId;

  try {
    movieController.deleteMovieById(movieId, (err, results) => {
      if(err){
        return res.status(400).send(err);
      }
      return res.status(200).send({STATUS:"OK", data:results});
    })
  } catch (err) {
    return res.status(400).send("Unexpected error occurred, try after some time", err);
  }
});

module.exports = router;
