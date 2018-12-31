const express = require("express");
const router = express.Router();

//get req user
router.get("/", function(req, res) {
  res.render("home");
});
router.get("/statistics", function(req, res) {
  res.render("statistics");
});

module.exports = router;
