var express = require("express");
var router = express.Router();
const axios = require("axios");

const apiKey = "3b590e7bad40ab5efefeac4771f25bb0";
const apiBaseUrl = "https://api.themoviedb.org/3";
const nowPlayingUrl = `${apiBaseUrl}/movie/now_playing?api_key=${apiKey}`;
const imageBaseUrl = "https://image.tmdb.org/t/p/w300";

/* GET home page. */
router.get("/",  (req, res, next) => {
  axios
    .get(nowPlayingUrl)
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
  res.render("index", {});
});

module.exports = router;
