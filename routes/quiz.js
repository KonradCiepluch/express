const express = require("express");
const router = express.Router();
const Quiz = require("../models/quiz");

/* GET home page. */
router.get("/", (req, res, next) => {
  const show = !req.session.vote;

  Quiz.find({}, (err, data) => {
    let sum = 0;
    data.forEach((item) => {
      sum += item.vote;
    });

    res.render("quiz", { title: "Quiz", data, show, sum });
  });
});

router.post("/", (req, res, next) => {
  const id = req.body.quiz;

  Quiz.findOne({ _id: id }, (err, data) => {
    data.vote++;
    data.save((err) => {
      req.session.vote = 1;
      res.redirect("/quiz");
    });
  });
});

module.exports = router;
