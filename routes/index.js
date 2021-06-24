var express = require("express");
var router = express.Router();
const axios = require("axios");
const passport = require("passport");

const apiKey = "3b590e7bad40ab5efefeac4771f25bb0";
const apiBaseUrl = "https://api.themoviedb.org/3";
const nowPlayingUrl = `${apiBaseUrl}/movie/now_playing?api_key=${apiKey}`;
const imageBaseUrl = "https://image.tmdb.org/t/p/w300";

// const apiKey = "12345689";
// const apiBaseUrl = "http://localhost:3030";
// const nowPlayingUrl = `${apiBaseUrl}/most_popular?api_key=${apiKey}`;
// const imageBaseUrl = "https://image.tmdb.org/t/p/w300";

router.use((req, res, next) => {
  res.locals.imageBaseUrl = imageBaseUrl;
  next();
});

/* GET home page. */
router.get("/", async (req, res, next) => {
  try {
    const response = await axios.get(nowPlayingUrl);
    const movieData = response.data.results;
    res.render("index", { movieData });
  } catch (err) {
    console.log(err);
  }
});

router.get("/login", passport.authenticate("github"));

router.get("/movie/:id", (req, res, next) => {
  const movieId = req.params.id;
  const thismovieUrl = `${apiBaseUrl}/movie/${movieId}?api_key=${apiKey}`;
  // console.log(thismovieUrl);
  // try {
  //   const response = await axios.get(thismovieUrl);
  //   const movieDetails = response.data;
  //   // console.log(movieDetails);
  //    res.render("single_movie", { movieDetails });
  // } catch (err) {
  //   console.log(err);
  // }

  axios
    .get(thismovieUrl)
    .then((response) => {
      const movieDetails = response.data;
      res.render("single_movie", { movieDetails });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/search", (req, res, next) => {
  // res.send("Sanity Check");
  const searchTerm = encodeURI(req.body.movieSearch);
  const cat = req.body.cat;
  const movieUrl = `${apiBaseUrl}/search/${cat}?query=${searchTerm}&api_key=${apiKey}`;

  axios
    .get(movieUrl)
    .then((response) => {
      let movieData = response.data.results;
      if (cat === "person") {
        movieData = response.data.results[0].known_for;
      }

      res.render("index", { movieData });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
