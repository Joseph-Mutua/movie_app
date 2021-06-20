var express = require("express");
var router = express.Router();
const axios = require("axios");

const apiKey = "3b590e7bad40ab5efefeac4771f25bb0";
const apiBaseUrl = "https://api.themoviedb.org/3";
const nowPlayingUrl = `${apiBaseUrl}/movie/now_playing?api_key=${apiKey}`;
const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

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

module.exports = router;
